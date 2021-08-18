import { h, Component, Fragment, Element, Prop } from "@stencil/core";

@Component({
  tag: "dso-toggletip",
  styleUrl: "toggletip.scss",
  shadow: true,
})
export class Toggletip {
  @Element()
  host!: HTMLElement;

  @Prop()
  active: boolean = false;

  button!: HTMLButtonElement;

  componentDidRender() {
    const button = this.host.shadowRoot?.querySelector("button");
    if (!button) {
      throw Error("button not found");
    }

    this.button = button;
  }

  click = () => {
    this.active ? this.close() : this.open();
  };

  open = () => {
    this.active = true;
    this.host.addEventListener("keydown", this.keyDownListener);
    this.host.addEventListener("focusout", this.focusOutListener);
  };

  close = () => {
    this.host.removeEventListener("focusout", this.focusOutListener);
    this.host.removeEventListener("keydown", this.keyDownListener);
    this.active = false;
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
          aria-expanded={"" + this.active}
        >
          <dso-icon icon="info"></dso-icon>
        </button>
        <dso-tooltip stateless for="toggle" active={this.active}>
          <slot />
        </dso-tooltip>
      </>
    );
  }
}
