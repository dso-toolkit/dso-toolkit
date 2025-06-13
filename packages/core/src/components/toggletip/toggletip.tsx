import { Placement } from "@popperjs/core";
import { Component, Element, Fragment, h, Prop, State } from "@stencil/core";
import { BadgeStatus } from "../badge/badge.interfaces";

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

  /**
   * The type of Toggletip.
   */
  @Prop()
  mode: "toggle" | "secondary" | "badge" | "icon" = "toggle";

  /**
   * The type of badge when `mode`=`badge`
   */
  @Prop()
  badgeStatus?: BadgeStatus;

  /**
   * The icon when `mode`=`icon`
   */
  @Prop()
  icon?: string;

  /**
   * The icon when `mode`=`icon` and the Toggletip is visible
   */
  @Prop()
  iconActive?: string;

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
      <>
        <div class="toggletip-container" onClick={this.click}>
          {["toggle", "secondary"].includes(this.mode) && (
            <dso-info-button
              aria-describedby="toggle"
              label={this.label}
              active={this.active}
              secondary={this.mode === "secondary"}
              ref={(element) => (this.infoButton = element)}
            />
          )}
          {this.mode === "badge" && <dso-badge status={this.badgeStatus}>{this.label}</dso-badge>}
          {this.mode === "icon" && <dso-icon icon={this.active ? this.iconActive : this.icon}></dso-icon>}
        </div>
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
      </>
    );
  }
}
