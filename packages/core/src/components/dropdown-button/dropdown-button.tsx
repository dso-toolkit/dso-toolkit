import { Component, h, Prop, Watch, Element } from "@stencil/core";
import clsx from "clsx";
import { tabbable } from "tabbable";
import { v4 as uuidv4 } from "uuid";

function tabInPopup(host: Element, direction: "up" | "down") {
  const tabs = tabbable(host);
  const currentIndex = tabs.findIndex((e) => e === document.activeElement);

  var nextIndex = currentIndex + (direction == "down" ? 1 : -1);
  if (nextIndex >= tabs.length) {
    nextIndex = 1;
  } else if (nextIndex < 1) {
    nextIndex = tabs.length - 1;
  }

  tabs[nextIndex]?.focus();
}

function escapePopup(host: Element) {
  tabbable(host)[0]?.focus();
  host.setAttribute("open", "false");
}

function closePopupOnLastTab(host: Element) {
  if (tabbable(host).pop() === document.activeElement) {
    host.setAttribute("open", "false");
  }
}

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
      return;
    }

    this.button = this.el.getElementsByTagName("button")[0];
    if (!this.button) {
      return;
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
    this.el?.addEventListener("keydown", this.keyDownListener);
    this.button?.setAttribute("aria-expanded", "true");
  }

  closePopup() {
    this.el?.removeEventListener("keydown", this.keyDownListener);
    this.button?.setAttribute("aria-expanded", "false");
  }

  keyDownListener(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return;
    }

    const currentTarget = event.currentTarget as Element;
    const target = event.target as HTMLElement;
    switch (event.key) {
      case "ArrowDown":
        tabInPopup(currentTarget, "down");
        break;

      case "ArrowUp":
        tabInPopup(currentTarget, "up");
        break;

      case "Escape":
        escapePopup(currentTarget);
        break;

      case "Tab":
        closePopupOnLastTab(currentTarget);
        return;

      case " ":
        target.click();
        break;

      default:
        return;
    }

    event.preventDefault();
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
