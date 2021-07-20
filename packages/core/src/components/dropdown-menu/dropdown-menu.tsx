import { Component, h, Prop, Watch, Element } from "@stencil/core";
import clsx from "clsx";
import { tabbable } from "tabbable";
import { v4 as uuidv4 } from "uuid";

@Component({
  tag: "dso-dropdown-menu",
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

  @Element()
  el: HTMLElement | undefined;

  get host(): HTMLElement {
    if (!this.el) {
      throw new ReferenceError("Host element not found");
    }

    return this.el;
  }

  get button(): HTMLButtonElement {
    let button = this.host.getElementsByTagName("button")[0];
    if (!button) {
      throw new ReferenceError("Mandatory toggle button not found");
    }

    return button;
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
    this.button.setAttribute("aria-haspopup", "true");
    this.button.setAttribute("aria-expanded", "false");
    if (!this.button.id) {
      this.button.id = uuidv4();
    }

    this.button.onclick = () => (this.open = !this.open);

    for (const ul of Array.from(this.host.getElementsByTagName("ul"))) {
      ul.setAttribute("aria-labelledby", this.button.id);
    }

    if (this.open) {
      this.openPopup();
    }
  }

  openPopup() {
    this.host.addEventListener("keydown", this.keyDownListener);
    this.button.setAttribute("aria-expanded", "true");
  }

  closePopup() {
    this.host.removeEventListener("keydown", this.keyDownListener);
    this.button.setAttribute("aria-expanded", "false");
  }

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
        this.escapePopup();
        break;

      case "Tab":
        this.closePopupOnLastTab();
        return;

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

  tabInPopup(direction: number) {
    const tabs = tabbable(this.host);
    const currentIndex = tabs.findIndex((e) => e === document.activeElement);

    let nextIndex = currentIndex + direction;
    if (nextIndex >= tabs.length) {
      nextIndex = 1;
    } else if (nextIndex < 1) {
      nextIndex = tabs.length - 1;
    }

    tabs[nextIndex].focus();
  }

  escapePopup() {
    this.button.focus();
    this.open = false;
  }

  closePopupOnLastTab() {
    if (tabbable(this.host).pop() === document.activeElement) {
      this.open = false;
    }
  }

  render() {
    return (
      <div class={clsx("dropdown", this.dropdownAlign, { open: this.open })}>
        <slot name="button" />
        <div class="dropdown-menu" hidden={!this.open}>
          <slot />
        </div>
      </div>
    );
  }
}
