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

  infoButton?: HTMLDsoInfoButtonElement;

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
      this.infoButton?.setFocus();
      event.preventDefault();
    }

    return;
  };

  render() {
    return (
      <>
        <dso-info-button
          id="toggle"
          aria-describedby="toggle-tooltip"
          onClick={this.click}
          label={this.label}
          active={this.active}
          secondary={this.secondary}
          ref={element => this.infoButton = element}
        />
        <dso-tooltip
          stateless
          descriptive
          for="toggle-tooltip"
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
