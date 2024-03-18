import { createPopper, Placement, Instance as PopperInstance } from "@popperjs/core";
import { h, Component, Element, Host, Prop, Watch, Listen } from "@stencil/core";
import { FocusableElement, tabbable } from "tabbable";
import { v4 as uuidv4 } from "uuid";

import { hasOverflow } from "../../utils/has-overflow";
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

  /**
   * Selector for the element the dropdown options should not be overflowing.
   */
  @Prop()
  boundary?: string;

  /**
   * Force placement of dropdown.
   *
   * This property overrides `dropdownAlign`.
   */
  @Prop()
  placement?: Placement;

  /**
   * Set position strategy of dropdown options
   */
  @Prop()
  strategy: "auto" | "absolute" | "fixed" = "auto";

  @Watch("placement")
  @Watch("dropdownAlign")
  watchPosition() {
    if (!this.popper) {
      return;
    }

    this.popper.setOptions({
      placement: this.placement || (this.dropdownAlign === "right" ? "bottom-end" : "bottom-start"),
    });
  }

  @Watch("dropdownOptionsOffset")
  watchOptionsOffset() {
    this.popper?.setOptions({
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, this.dropdownOptionsOffset],
          },
        },
      ],
    });
  }

  @Watch("strategy")
  watchStrategy() {
    this.setStrategy();
  }

  private setStrategy() {
    if (!this.popper) {
      return;
    }

    if (this.strategy === "absolute" || this.strategy === "fixed") {
      this.popper.setOptions({
        strategy: this.strategy,
      });

      return;
    }

    let element: Element | null = this.host;

    const boundary = this.boundary || document;

    while (element && element.parentNode !== boundary) {
      element = element.parentNode instanceof ShadowRoot ? element.parentNode.host : element.parentElement;
      if (element !== null && hasOverflow(element)) {
        this.popper.setOptions({
          strategy: "fixed",
        });

        return;
      }
    }

    this.popper.setOptions({
      strategy: "absolute",
    });
  }

  @Element()
  host!: HTMLDsoDropdownMenuElement;

  private popper: PopperInstance | undefined;

  get button(): HTMLButtonElement {
    const button = this.host.querySelector('button[slot="toggle"]');

    if (!(button instanceof HTMLButtonElement)) {
      throw new ReferenceError("Mandatory toggle button not found");
    }

    return button;
  }

  private tabbables(withButton: boolean): FocusableElement[] {
    const tabbables = tabbable(this.host);

    return withButton ? tabbables : tabbables.filter((element) => element !== this.button);
  }

  componentDidLoad() {
    this.button.setAttribute("aria-haspopup", "menu");
    this.button.setAttribute("aria-expanded", "false");
    if (!this.button.id) {
      this.button.id = uuidv4();
    }

    const options = this.host.querySelector(".dso-dropdown-options");
    if (!options) {
      throw new ReferenceError("Dropdown options not found");
    }

    options.setAttribute("role", "menu");
    options.setAttribute("aria-labelledby", this.button.id);

    for (const ul of Array.from(this.host.getElementsByTagName("ul"))) {
      ul.setAttribute("role", "group");
      for (const li of Array.from(ul.getElementsByTagName("li"))) {
        li.setAttribute("role", "none");
      }
    }

    if (this.popper) {
      return;
    }

    const dropdownOptionsElement = this.host.querySelector(".dso-dropdown-options");

    if (!(dropdownOptionsElement instanceof HTMLElement)) {
      throw new Error("dropdown options element is not instanceof HTMLElement");
    }

    this.popper = createPopper(this.button, dropdownOptionsElement, {
      placement: this.placement || (this.dropdownAlign === "right" ? "bottom-end" : "bottom-start"),
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, this.dropdownOptionsOffset],
          },
        },
        {
          name: "preventOverflow",
          options: {
            boundary: this.boundary ? document.querySelector(this.boundary) : null,
          },
          enabled: this.boundary !== undefined,
        },
      ],
    });
  }

  componentDidRender() {
    this.setStrategy();
    if (this.open) {
      this.popper?.update();
    }

    for (const li of Array.from(this.host.getElementsByTagName("li"))) {
      for (const tab of tabbable(li)) {
        tab.setAttribute("role", this.checkable ? "menuitemradio" : "menuitem");

        if (this.checkable) {
          tab.setAttribute("aria-checked", li.classList.contains("dso-checked").toString());
        }
      }
    }

    this.button.setAttribute("aria-expanded", this.open ? "true" : "false");
  }

  @Listen("click", { target: "window" })
  onClick(event: MouseEvent) {
    const composedPath = event.composedPath();

    if (this.isToggleButtonEvent(composedPath)) {
      this.open = !this.open;
    } else if (this.open && this.isMenuItemEvent(composedPath)) {
      this.open = false;
    }
  }

  private isToggleButtonEvent(composedPath: EventTarget[]) {
    return composedPath.includes(this.button);
  }

  private isMenuItemEvent(composedPath: EventTarget[]) {
    return composedPath.includes(this.host) && !this.isToggleButtonEvent(composedPath);
  }

  disconnectedCallback() {
    this.popper?.destroy();
  }

  private focusOutListener = (event: FocusEvent) => {
    if (
      this.open &&
      (!(event.relatedTarget instanceof HTMLElement) || !this.tabbables(true).includes(event.relatedTarget))
    ) {
      this.open = false;
    }
  };

  @Listen("keydown", { target: "window" })
  keyDownListener(event: KeyboardEvent) {
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
  }

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
    this.open = false;
  };

  render() {
    return (
      <Host onFocusout={this.focusOutListener}>
        <slot name="toggle" />
        <div hidden={!this.open}>
          <slot />
        </div>
      </Host>
    );
  }
}
