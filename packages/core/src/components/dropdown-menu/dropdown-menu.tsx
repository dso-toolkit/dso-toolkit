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

    this.host
      .querySelector(".dso-dropdown-options")
      ?.setAttribute("role", "menu");
    for (const ul of Array.from(this.host.getElementsByTagName("ul"))) {
      ul.setAttribute("aria-labelledby", this.button.id);
      for (const li of Array.from(ul.getElementsByTagName("li"))) {
        li.setAttribute("role", "menuitemradio");
        if (li.classList.contains("dso-checked")) {
          li.setAttribute("aria-checked", "true");
        }
      }
    }

    if (this.open) {
      this.openPopup();
    }
  }

  openPopup() {
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

  tabInPopup(direction: number) {
    const tabs = this.tabbables;
    const currentIndex = tabs.findIndex((e) => e === document.activeElement);

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
