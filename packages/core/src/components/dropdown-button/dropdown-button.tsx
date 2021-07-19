import { Component, h, Prop, Watch, Element } from "@stencil/core";
import clsx from "clsx";
import { tabbable } from "tabbable";
import { v4 as uuidv4 } from "uuid";

@Component({
  tag: "dso-dropdown-button",
  shadow: true,
})
export class DropdownButton {
  /**
   * Whether the dropdown is open or closed.
   * This attribute is reflected and mutable.
   */
  @Prop({ reflect: true, mutable: true })
  open = false;

  @Element()
  el: HTMLElement | undefined;

  button: HTMLButtonElement | undefined;

  @Watch("open")
  openWatch(open: boolean) {
    if (open) {
      this.openPopup();
    } else {
      this.closePopup();
    }
  }

  connectedCallback() {
    if (!this.el) {
      throw new ReferenceError("Host element not found");
    }

    this.button = this.el.getElementsByTagName("button")[0];
    if (!this.button) {
      throw new ReferenceError("Mandatory toggle button not found");
    }

    this.button.setAttribute("aria-haspopup", "true");
    this.button.setAttribute("aria-expanded", "false");
    if (!this.button.id) {
      this.button.id = uuidv4();
    }

    this.button.onclick = () => (this.open = !this.open);

    for (const ul of Array.from(this.el.getElementsByTagName("ul"))) {
      ul.setAttribute("aria-labelledby", this.button.id);
    }

    if (this.open) {
      this.openPopup();
    }
  }

  openPopup() {
    if (!this.el) {
      throw new ReferenceError("Host element not found");
    }

    if (!this.button) {
      throw new ReferenceError("Mandatory toggle button not found");
    }

    this.el.addEventListener("keydown", this.keyDownListener);
    this.button.setAttribute("aria-expanded", "true");
  }

  closePopup() {
    if (!this.el) {
      throw new ReferenceError("Host element not found");
    }

    if (!this.button) {
      throw new ReferenceError("Mandatory toggle button not found");
    }

    this.el.removeEventListener("keydown", this.keyDownListener);
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
    if (!this.el) {
      throw new ReferenceError("Host element not found");
    }

    const tabs = tabbable(this.el);
    const currentIndex = tabs.findIndex((e) => e === document.activeElement);

    var nextIndex = currentIndex + direction;
    if (nextIndex >= tabs.length) {
      nextIndex = 1;
    } else if (nextIndex < 1) {
      nextIndex = tabs.length - 1;
    }

    tabs[nextIndex].focus();
  }

  escapePopup() {
    if (!this.button) {
      throw new ReferenceError("Mandatory toggle button not found");
    }

    this.button.focus();
    this.open = false;
  }

  closePopupOnLastTab() {
    if (!this.el) {
      throw new ReferenceError("Host element not found");
    }

    if (tabbable(this.el).pop() === document.activeElement) {
      this.open = false;
    }
  }

  render() {
    return (
      <div class={clsx("dropdown", { open: this.open })}>
        <slot name="button" />
        <div class="dropdown-menu" hidden={!this.open}>
          <slot />
        </div>
      </div>
    );
  }
}
