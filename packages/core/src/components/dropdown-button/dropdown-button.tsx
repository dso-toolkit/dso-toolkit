import { Component, h, Prop, Watch, Element } from "@stencil/core";
import clsx from "clsx";
import { tabbable } from "tabbable";
import { v4 as uuidv4 } from "uuid";

function tabInPopup(host: Element, down: boolean) {
  const tabs = tabbable(host);
  const currentIndex = tabs.findIndex((e) => e === document.activeElement);
  const nextIndex = down
    ? currentIndex >= tabs.length - 1
      ? 0
      : currentIndex + 1
    : currentIndex <= 0
    ? tabs.length - 1
    : currentIndex - 1;
  (tabs[nextIndex] as HTMLElement)?.focus();
}

function escapePopup(host: Element) {
  host.shadowRoot?.children[0]?.getElementsByTagName("button")[0]?.focus();
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

  /**
   * The text of the dropdown button.
   * */
  @Prop()
  label: string = "";

  /**
   * The button style variant
   */
  @Prop()
  variant: "primary" | "secondary" | "tertiary" = "primary";

  @Element()
  el: HTMLElement | undefined;

  @Watch("open")
  openWatch(open: boolean) {
    if (open) {
      this.openPopup();
    } else {
      this.closePopup();
    }
  }

  id = uuidv4();

  connectedCallback() {
    if (this.open) {
      this.openPopup();
    }

    if (!this.el) {
      return;
    }

    for (const ul of Array.from(this.el.getElementsByTagName("ul"))) {
      ul.setAttribute("aria-labelledby", this.id);
    }
  }

  openPopup() {
    this.el?.addEventListener("keydown", this.keyDownListener);
  }

  closePopup() {
    this.el?.removeEventListener("keydown", this.keyDownListener);
  }

  keyDownListener(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return;
    }

    const currentTarget = event.currentTarget as Element;
    const target = event.target as HTMLElement;
    switch (event.key) {
      case "ArrowDown":
        tabInPopup(currentTarget, true);
        break;

      case "ArrowUp":
        tabInPopup(currentTarget, false);
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
        <button
          id={this.id}
          type="button"
          aria-haspopup="true"
          aria-expanded={"" + this.open}
          class={this.variant}
          onClick={() => (this.open = !this.open)}
        >
          <span>{this.label}</span>
        </button>

        <div class="dropdown-menu" hidden={!this.open}>
          <slot />
        </div>
      </div>
    );
  }
}
