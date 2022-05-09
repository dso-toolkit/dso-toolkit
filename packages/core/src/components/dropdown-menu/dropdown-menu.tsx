import { Component, h, Prop, Watch, Element, Fragment } from "@stencil/core";
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

  @Element()
  host!: HTMLElement;

  get button(): HTMLButtonElement {
    const button = this.host.querySelectorAll('button[slot="toggle"]')[0];
    if (!(button instanceof HTMLButtonElement)) {
      throw new ReferenceError("Mandatory toggle button not found");
    }

    return button;
  }

  get tabbables(): FocusableElement[] {
    return tabbable(this.host).filter((e) => e !== this.button);
  }

  @Watch("open")
  openWatch(open: boolean) {
    if (open) {
      this.openPopup();
    } else {
      this.closePopup();
    }
  }

  connectedCallback() {
    this.button.setAttribute("aria-haspopup", "menu");
    this.button.setAttribute("aria-expanded", "false");
    if (!this.button.id) {
      this.button.id = uuidv4();
    }

    this.button.addEventListener("click", () => {
      this.open = !this.open;
    });

    const options = this.host.querySelector(".dso-dropdown-options");
    if (options == null) {
      throw new ReferenceError("Dropdown options not found");
    }

    options.setAttribute("role", "menu");
    options.setAttribute("aria-labelledby", this.button.id);

    for (const ul of Array.from(this.host.getElementsByTagName("ul"))) {
      ul.setAttribute("role", "none");
      for (const li of Array.from(ul.getElementsByTagName("li"))) {
        li.setAttribute("role", "none");
      }
    }

    if (this.open) {
      this.openPopup();
    }
  }

  componentDidRender() {
    for (const li of Array.from(this.host.getElementsByTagName("li"))) {
      for (const tab of tabbable(li)) {
        tab.setAttribute("role", this.checkable ? "menuitemradio" : "menuitem");
        if (this.checkable && li.classList.contains("dso-checked")) {
          tab.setAttribute("aria-checked", "true");
        } else {
          tab.removeAttribute("aria-checked");
        }
      }
    }
  }

  openPopup() {
    this.host.setAttribute("tabindex", "-1");
    this.host.addEventListener("keydown", this.keyDownListener);
    this.host.addEventListener("focusout", this.focusOutListener);
    this.button.setAttribute("aria-expanded", "true");
    this.tabbables.forEach((tabbable) =>
      tabbable.addEventListener("click", this.escape)
    );
  }

  closePopup() {
    this.host.removeEventListener("keydown", this.keyDownListener);
    this.host.removeEventListener("focusout", this.focusOutListener);
    this.button.setAttribute("aria-expanded", "false");
    this.host.removeAttribute("tabindex");
    this.tabbables.forEach((tabbable) =>
      tabbable.removeEventListener("click", this.escape)
    );
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
    } else {
      return activeEl;
    }
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
      <>
        <slot name="toggle" />
        <div hidden={!this.open}>
          <slot />
        </div>
      </>
    );
  }
}
