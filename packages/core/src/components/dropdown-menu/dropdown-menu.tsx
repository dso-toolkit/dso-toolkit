import { createPopper, Instance as PopperInstance } from "@popperjs/core";
import { Component, h, Prop, Element, Host, Watch } from "@stencil/core";
import { FocusableElement, tabbable } from "tabbable";
import { v4 as uuidv4 } from "uuid";

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
   * Whether the menu is checkable.
   */
  @Prop()
  checkable = false;

  /** Selector for the element the dropdown options should not be overflowing.*/
  @Prop()
  boundary?: string;

  @Watch("dropdownAlign")
  watchPosition() {
    if (!this.popper) {
      return;
    }

    this.popper.setOptions({
      placement: this.dropdownAlign === "right" ? "bottom-end" : "bottom-start",
    });
  }

  @Element()
  host!: HTMLElement;

  private popper: PopperInstance | undefined;

  get button(): HTMLButtonElement {
    const button = this.host.querySelector('button[slot="toggle"]');

    if (!(button instanceof HTMLButtonElement)) {
      throw new ReferenceError("Mandatory toggle button not found");
    }

    return button;
  }

  get tabbables(): FocusableElement[] {
    return tabbable(this.host).filter((e) => e !== this.button);
  }

  componentDidLoad() {
    this.button.setAttribute("aria-haspopup", "menu");
    this.button.setAttribute("aria-expanded", "false");
    if (!this.button.id) {
      this.button.id = uuidv4();
    }

    this.button.addEventListener("click", () => {
      this.open = !this.open;
    });

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

    const dropdownOptions = this.host.querySelector(".dso-dropdown-options");

    if (!(dropdownOptions instanceof HTMLElement)) {
      throw new Error("dropdown options element is not instanceof HTMLElement");
    }

    this.popper = createPopper(this.button, dropdownOptions, {
      placement: this.dropdownAlign === "right" ? "bottom-end" : "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 2], // 2px margin between button and options
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
    this.popper?.update();
    for (const li of Array.from(this.host.getElementsByTagName("li"))) {
      for (const tab of tabbable(li)) {
        tab.setAttribute("role", this.checkable ? "menuitemradio" : "menuitem");

        if (this.checkable) {
          tab.setAttribute("aria-checked", li.classList.contains("dso-checked").toString());
        }
      }
    }

    this.host.removeEventListener("keydown", this.keyDownListener);
    this.button.setAttribute("aria-expanded", this.open ? "true" : "false");
    if (this.open) {
      this.host.addEventListener("keydown", this.keyDownListener);
    }

    this.tabbables.forEach((tabbable) => {
      tabbable.removeEventListener("click", this.escape);
      if (this.open) {
        tabbable.addEventListener("click", this.escape);
      }
    });
  }

  disconnectedCallback() {
    this.popper?.destroy();
  }

  focusOutListener = (event: FocusEvent) => {
    if (!this.tabbables.includes(event.relatedTarget as FocusableElement)) {
      this.open = false;
    }
  };

  keyDownListener = (event: KeyboardEvent) => {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        this.tabInPopup(1);
        break;

      case "ArrowUp":
        this.tabInPopup(-1);
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

  getActiveElement(root: Document | ShadowRoot = document): Element | null {
    const activeEl = root.activeElement;

    if (!activeEl) {
      return null;
    }

    if (activeEl.shadowRoot) {
      return this.getActiveElement(activeEl.shadowRoot);
    }

    return activeEl;
  }

  tabInPopup(direction: number) {
    const tabs = this.tabbables;
    const currentIndex = tabs.findIndex((e) => e === this.getActiveElement());

    let nextIndex = currentIndex + direction;
    if (nextIndex >= tabs.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = tabs.length - 1;
    }

    tabs[nextIndex].focus();
  }

  escape = () => {
    this.button.focus();
    this.open = false;
  };

  render() {
    return (
      <Host onFocusout={this.focusOutListener} tabindex={this.open ? "-1" : undefined}>
        <slot name="toggle" />
        <div hidden={!this.open}>
          <slot />
        </div>
      </Host>
    );
  }
}
