import { h, Component, Fragment, Element, Prop, State } from "@stencil/core";

@Component({
  tag: "dso-toggletip",
  styleUrl: "toggletip.scss",
  shadow: true,
})
export class Toggletip {
  @Element()
  host!: HTMLElement;

  @State()
  active: boolean = false;

  @Prop()
  label: string = "Toelichting";

  @Prop()
  position: "top" | "right" | "bottom" | "left" = "right";

  @Prop()
  small?: boolean;

  @Prop()
  secondary?: boolean;

  infoButton!: HTMLDsoInfoButtonElement;

  button!: HTMLButtonElement;

  componentDidRender() {
    const infoButton = this.host.shadowRoot?.querySelector("dso-info-button");
    if (!infoButton) {
      throw Error("dso-info-button not found");
    }

    this.infoButton = infoButton;

    const button = this.infoButton?.shadowRoot?.querySelector("button");
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
        <dso-info-button
          id="toggle"
          onClick={this.click}
          label={this.label}
          active={this.active}
          secondary={this.secondary}
        />
        <dso-tooltip
          stateless
          for="toggle"
          active={this.active}
          position={this.position}
          small={this.small}
        >
          <slot />
        </dso-tooltip>
      </>
    );
  }
}
