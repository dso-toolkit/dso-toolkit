import { Placement } from "@popperjs/core";
import { Component, Element, Fragment, Prop, State, h } from "@stencil/core";

@Component({
  tag: "dso-toggletip",
  styleUrl: "toggletip.scss",
  shadow: true,
})
export class Toggletip {
  @Element()
  host!: HTMLDsoToggletipElement;

  @State()
  active = false;

  /**
   * Toggletip label.
   */
  @Prop()
  label = "Toelichting";

  /**
   * Toggletip position.
   */
  @Prop()
  position: Placement = "right";

  /**
   * Set to true for small Toggletip.
   */
  @Prop()
  small?: boolean;

  private infoButton?: HTMLDsoInfoButtonElement;

  private click = () => {
    if (this.active) {
      this.close();
    } else {
      this.open();
    }
  };

  private open = () => {
    this.active = true;
    this.host.addEventListener("keydown", this.keyDownListener);
    this.host.addEventListener("focusout", this.focusOutListener);
  };

  private close = () => {
    this.host.removeEventListener("focusout", this.focusOutListener);
    this.host.removeEventListener("keydown", this.keyDownListener);
    this.active = false;
  };

  private focusOutListener = (event: FocusEvent) => {
    if (!this.host.contains(event.relatedTarget as Node)) {
      this.close();
    }
  };

  private keyDownListener = (event: KeyboardEvent) => {
    if (!event.defaultPrevented && event.key === "Escape") {
      this.close();
      this.infoButton?.setFocus();
      event.preventDefault();
    }

    return;
  };

  render() {
    return (
      <Fragment>
        <dso-info-button
          aria-describedby="toggle"
          onClick={this.click}
          label={this.label}
          active={this.active}
          ref={(element) => (this.infoButton = element)}
        />
        <dso-tooltip
          stateless
          descriptive
          id="toggle"
          strategy="absolute"
          active={this.active}
          position={this.position}
          small={this.small}
        >
          <slot />
        </dso-tooltip>
      </Fragment>
    );
  }
}
