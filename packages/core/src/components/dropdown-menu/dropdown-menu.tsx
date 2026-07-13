import { autoUpdate, computePosition, flip, offset, size } from "@floating-ui/dom";
import {
  Component,
  ComponentInterface,
  Element,
  Host,
  Listen,
  Method,
  Prop,
  State,
  forceUpdate,
  h,
} from "@stencil/core";
import { createStore } from "@stencil/store";
import { v4 as uuidv4 } from "uuid";

import {
  DropdownMenuInternalState,
  DropdownMenuItemClickEvent,
  DropdownMenuTabbable,
} from "./dropdown-menu.interfaces";

@Component({
  tag: "dso-dropdown-menu",
  styleUrl: "dropdown-menu.scss",
  shadow: true,
})
export class DropdownMenu implements ComponentInterface {
  private readonly dropdownMenuState: DropdownMenuInternalState;

  @Element()
  host!: HTMLDsoDropdownMenuElement;

  constructor() {
    const { state } = createStore<DropdownMenuInternalState>({
      checkable: false,
    });

    this.dropdownMenuState = state;
  }

  private button?: HTMLButtonElement;

  /**
   * Whether the menu items are checkable.
   */
  @Prop({ reflect: true })
  get checkable(): boolean {
    return this.dropdownMenuState.checkable;
  }
  set checkable(value: boolean) {
    this.dropdownMenuState.checkable = value || false;

    forceUpdate(this.host);
  }

  /**
   * The label of the Dropdown Menu Button
   */
  @Prop({ reflect: true })
  label: string | undefined;

  /**
   * The variant of the Button to toggle the menu
   */
  @Prop({ reflect: true })
  variant: "primary" | "secondary" | "tertiary" = "secondary";

  @State()
  open = false;

  @Listen("dsoClick")
  dsoClickHandler(event: CustomEvent<DropdownMenuItemClickEvent>) {
    event.stopPropagation();

    if (this.open && event.target instanceof HTMLElement) {
      this.toggleOptions(false);
    }
  }

  /**
   * @internal
   */
  @Method()
  async _getState(): Promise<DropdownMenuInternalState> {
    return this.dropdownMenuState;
  }

  private cleanUp: ReturnType<typeof autoUpdate> | undefined;
  private popoverElement: HTMLDivElement | undefined;

  private dropdownMenuTabbables(withButton: boolean): DropdownMenuTabbable[] {
    const menuItems = this.host.isConnected
      ? Array.from(
          this.host.querySelectorAll<HTMLDsoDropdownMenuItemElement>(
            ":scope > dso-dropdown-menu-group > dso-dropdown-menu-item",
          ),
        )
      : [];

    return withButton ? [this.host, ...menuItems] : menuItems;
  }

  componentDidRender() {
    if (this.button && this.popoverElement && !this.cleanUp) {
      const element = this.popoverElement;
      const referenceElement = this.button;

      this.cleanUp = autoUpdate(referenceElement, element, () => {
        computePosition(referenceElement, element, {
          strategy: "fixed",
          middleware: [
            offset(2),
            flip({
              padding: 2,
            }),
            size({
              apply({ availableHeight, availableWidth, elements }) {
                const scrollElement =
                  elements.floating.querySelector<HTMLElement>("dso-scrollable") ?? elements.floating;

                Object.assign(scrollElement.style, {
                  maxHeight: `${availableHeight}px`,
                  maxInlineSize: `${availableWidth}px`,
                });
              },
            }),
          ],
          placement: "bottom-start",
        }).then(({ x, y }) => {
          Object.assign(element.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      });
    }
  }

  private toggleOptions(force?: boolean) {
    this.open = force ?? !this.open;

    if (this.popoverElement?.isConnected) {
      this.popoverElement.togglePopover(this.open);
    }

    if (this.open) {
      requestAnimationFrame(() => this.moveFocusTo(this.firstItem(false)));
    }

    if (!this.open && this.cleanUp) {
      this.cleanUp();
      this.cleanUp = undefined;
    }
  }

  disconnectedCallback() {
    this.toggleOptions(false);
  }

  private focusOutListener = (event: FocusEvent) => {
    if (this.open && !(event.relatedTarget instanceof HTMLElement)) {
      this.toggleOptions(false);
    }
  };

  private get lastItem() {
    return this.dropdownMenuTabbables(true).at(-1);
  }

  private firstItem(withButton: boolean) {
    return this.dropdownMenuTabbables(withButton)[0];
  }

  private moveFocusToPrevious(focussedElement: HTMLElement, withButton = true) {
    const tabbables = this.dropdownMenuTabbables(withButton);
    const index = tabbables.findIndex((element) => element === focussedElement);
    const next = this.dropdownMenuTabbables(withButton)[index - 1] ?? this.lastItem;

    this.moveFocusTo(next);
  }

  private moveFocusToNext(focussedElement: HTMLElement, withButton = true) {
    const tabbables = this.dropdownMenuTabbables(withButton);
    const index = tabbables.findIndex((element) => element === focussedElement);
    const next = this.dropdownMenuTabbables(withButton)[index + 1] ?? this.firstItem(withButton);

    this.moveFocusTo(next);
  }

  private moveFocusTo(element: HTMLDsoDropdownMenuElement | HTMLDsoDropdownMenuItemElement | undefined) {
    if (!element) {
      return;
    }

    if (element === this.host && this.button) {
      this.button.focus();

      return;
    }

    if ("_dsoFocus" in element) {
      element._dsoFocus();
    }
  }

  private keyDownHandler = (event: KeyboardEvent) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.defaultPrevented || !this.open) {
      return;
    }

    switch (event.key) {
      case "Tab":
        if (event.shiftKey) {
          this.moveFocusToPrevious(event.target);
        } else {
          this.moveFocusToNext(event.target);
        }
        break;
      case "ArrowDown":
        this.moveFocusToNext(event.target, false);
        break;
      case "ArrowUp":
        this.moveFocusToPrevious(event.target, false);
        break;
      case "Escape":
        this.escape();
        break;
      default:
        return;
    }

    event.preventDefault();
  };

  private escape = () => {
    this.button?.focus();
    this.toggleOptions(false);
  };

  render() {
    const buttonId = uuidv4();

    return (
      <Host onFocusout={this.focusOutListener} onKeyDown={this.keyDownHandler}>
        {this.label && (
          <button
            id={buttonId}
            class={`dso-${this.variant}`}
            type="button"
            onClick={() => this.toggleOptions()}
            aria-expanded={this.open.toString()}
            aria-haspopup="menu"
            ref={(element) => (this.button = element)}
          >
            {this.label}
            <dso-icon icon={this.open ? "chevron-up" : "chevron-down"} />
          </button>
        )}
        <div
          popover="manual"
          class="dso-dropdown-options"
          aria-labelledby={buttonId}
          role="menu"
          ref={(element) => (this.popoverElement = element)}
        >
          <dso-scrollable>
            <slot />
          </dso-scrollable>
        </div>
      </Host>
    );
  }
}
