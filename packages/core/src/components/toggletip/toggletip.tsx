import { h, Component, Fragment, Element } from "@stencil/core";

@Component({
  tag: "dso-toggletip",
  styleUrl: "toggletip.scss",
  shadow: true,
})
export class Toggletip {
  @Element()
  host!: HTMLElement;

  button!: HTMLButtonElement;

  tooltip!: HTMLDsoTooltipElement;

  componentDidRender() {
    const button = this.host.shadowRoot?.querySelector("button");
    if (!button) {
      throw Error("button not found");
    }

    this.button = button;

    const tooltip = this.host.shadowRoot?.querySelector("dso-tooltip");
    if (!tooltip) {
      throw Error("tooltip not found");
    }

    this.tooltip = tooltip;
  }

  click = () => {
    this.tooltip.active ? this.close() : this.open();
  };

  open = () => {
    this.tooltip.active = true;
    this.button.setAttribute("aria-expanded", "true");
    this.host.addEventListener("keydown", this.keyDownListener);
    this.host.addEventListener("focusout", this.focusOutListener);
  };

  close = () => {
    this.host.removeEventListener("focusout", this.focusOutListener);
    this.host.removeEventListener("keydown", this.keyDownListener);
    this.button.setAttribute("aria-expanded", "false");
    this.tooltip.active = false;
  };

  focusOutListener = (event: FocusEvent) => {
    if (!this.host.contains(event.relatedTarget as Node)) {
      this.close();
    }
  };

  keyDownListener = (event: KeyboardEvent) => {
    if (!event.defaultPrevented && event.key == "Escape") {
      this.close();
      this.button.focus();
      event.preventDefault();
    }

    return;
  };

  render() {
    return (
      <>
        <button
          type="button"
          id="toggle"
          onClick={this.click}
          aria-expanded="false"
        >
          <dso-icon icon="info"></dso-icon>
        </button>
        <dso-tooltip stateless={true} for="toggle">
          <slot />
        </dso-tooltip>
      </>
    );
  }
}
