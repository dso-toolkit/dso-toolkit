import { autoUpdate, computePosition, flip, offset } from "@floating-ui/dom";
import { Component, Element, Host, Listen, Prop, h } from "@stencil/core";
import { FocusableElement, tabbable } from "tabbable";
import { v4 as uuidv4 } from "uuid";

import { getActiveElement } from "../../utils/get-active-element";

@Component({
  tag: "dso-dropdown-menu",
  styleUrl: "dropdown-menu.scss",
  shadow: true,
})
export class DropdownMenu {
  /**
   * Whether the menu is open or closed.
   * This attribute is reflected and mutable.
   */
  @Prop({ reflect: true, mutable: true })
  open = false;

  /**
   * Alignment of the dropdown
   */
  @Prop()
  dropdownAlign: "left" | "right" = "left";

  /**
   * Space between button and dropdown options
   */
  @Prop()
  dropdownOptionsOffset = 2;

  /**
   * Whether the menu is checkable.
   */
  @Prop()
  checkable = false;

  @Element()
  host!: HTMLDsoDropdownMenuElement;

  private cleanUp: ReturnType<typeof autoUpdate> | undefined;

  private popoverElement: HTMLDivElement | undefined;

  get button(): HTMLButtonElement {
    const button = this.host.querySelector('button[slot="toggle"]');

    if (!(button instanceof HTMLButtonElement)) {
      throw new ReferenceError("Mandatory toggle button not found");
    }

    return button;
  }

  private tabbables(withButton: boolean): FocusableElement[] {
    const tabbables = this.host.isConnected ? tabbable(this.host) : [];

    return withButton ? tabbables : tabbables.filter((element) => element !== this.button);
  }

  componentDidLoad() {
    this.button.setAttribute("aria-haspopup", "menu");
    this.button.setAttribute("aria-expanded", "false");
    if (!this.button.id) {
      this.button.id = uuidv4();
    }

    const dropdownOptionsElement = this.host.querySelector(".dso-dropdown-options");

    if (!(dropdownOptionsElement instanceof HTMLElement)) {
      throw new Error("dropdown options element is not instanceof HTMLElement");
    }

    dropdownOptionsElement.setAttribute("role", "menu");
    dropdownOptionsElement.setAttribute("aria-labelledby", this.button.id);

    for (const ul of Array.from(this.host.getElementsByTagName("ul"))) {
      ul.setAttribute("role", "group");
      for (const li of Array.from(ul.getElementsByTagName("li"))) {
        li.setAttribute("role", "none");
      }
    }
  }

  componentDidRender() {
    for (const li of Array.from(this.host.getElementsByTagName("li"))) {
      for (const tab of this.host.isConnected ? tabbable(li) : []) {
        tab.setAttribute("role", this.checkable ? "menuitemradio" : "menuitem");

        if (this.checkable) {
          tab.setAttribute("aria-checked", li.classList.contains("dso-checked").toString());
        }
      }
    }

    this.button.setAttribute("aria-expanded", this.open ? "true" : "false");

    if (this.popoverElement && !this.cleanUp) {
      const element = this.popoverElement;

      this.cleanUp = autoUpdate(this.button, element, () => {
        computePosition(this.button, element, {
          strategy: "fixed",
          middleware: [
            offset(this.dropdownOptionsOffset),
            flip({
              padding: this.dropdownOptionsOffset,
            }),
          ],
          placement: this.dropdownAlign === "right" ? "bottom-end" : "bottom-start",
        }).then(({ x, y }) => {
          Object.assign(element.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      });
    }
  }

  @Listen("click", { target: "window" })
  onClick(event: MouseEvent) {
    const composedPath = event.composedPath();

    if (this.isToggleButtonEvent(composedPath)) {
      this.toggleOptions();
    } else if (this.open && this.isMenuItemEvent(composedPath)) {
      this.toggleOptions(false);
    }
  }

  private isToggleButtonEvent(composedPath: EventTarget[]) {
    return composedPath.includes(this.button);
  }

  private isMenuItemEvent(composedPath: EventTarget[]) {
    return composedPath.includes(this.host) && !this.isToggleButtonEvent(composedPath);
  }

  private toggleOptions(force?: boolean) {
    this.open = force ?? !this.open;
    if (this.popoverElement?.isConnected) {
      this.popoverElement?.togglePopover(this.open);
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
    if (
      this.open &&
      (!(event.relatedTarget instanceof HTMLElement) || !this.tabbables(true).includes(event.relatedTarget))
    ) {
      this.toggleOptions(false);
    }
  };

  private keyDownListener = (event: KeyboardEvent) => {
    if (event.defaultPrevented || !this.open) {
      return;
    }

    switch (event.key) {
      case "Tab":
        if (event.shiftKey) {
          this.tabInPopup(this.tabbables(true), -1);
        } else {
          this.tabInPopup(this.tabbables(true), 1);
        }

        break;
      case "ArrowDown":
        this.tabInPopup(this.tabbables(false), 1);
        break;

      case "ArrowUp":
        this.tabInPopup(this.tabbables(false), -1);
        break;

      case "Escape":
        this.escape();
        break;

      case " ":
        if (event.target instanceof HTMLElement) {
          event.target.click();
        }

        break;

      default:
        return;
    }

    event.preventDefault();
  };

  private tabInPopup(tabbables: FocusableElement[], direction: number) {
    const currentIndex = tabbables.findIndex((e) => e === getActiveElement());

    let nextIndex = currentIndex + direction;
    if (nextIndex >= tabbables.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = tabbables.length - 1;
    }

    tabbables[nextIndex]?.focus();
  }

  private escape = () => {
    this.button.focus();
    this.toggleOptions(false);
  };

  render() {
    return (
      <Host onKeydown={this.keyDownListener} onFocusout={this.focusOutListener}>
        <slot name="toggle" />
        <div popover="manual" ref={(element) => (this.popoverElement = element)}>
          <slot />
        </div>
      </Host>
    );
  }
}
