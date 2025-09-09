import { Component, Event, EventEmitter, Host, Method, Prop, State, h } from "@stencil/core";
import clsx from "clsx";

import { InfoButtonToggleEvent } from "./info-button.interfaces";

@Component({
  tag: "dso-info-button",
  shadow: true,
  styleUrl: "info-button.scss",
})
export class InfoButton {
  private button?: HTMLDsoIconButtonElement;

  /**
   * Whether the InfoButton is active.
   */
  @Prop({ mutable: true, reflect: true })
  active?: boolean;

  @State()
  hover = false;

  /**
   * For secondary Info Button.
   */
  @Prop()
  secondary?: boolean;

  /**
   * The label.
   */
  @Prop()
  label = "Toelichting bij optie";

  /**
   * Emitted when the user activates the Info Button.
   */
  @Event()
  dsoToggle!: EventEmitter<InfoButtonToggleEvent>;

  /**
   * To set focus to the toggle button.
   */
  @Method()
  async setFocus() {
    this.button?.focus();
  }

  private handleToggle(e: MouseEvent) {
    this.active = !this.active;
    this.dsoToggle.emit({ originalEvent: e, active: this.active });
  }

  render() {
    return (
      <Host onMouseenter={() => (this.hover = true)} onMouseleave={() => (this.hover = false)}>
        <dso-icon-button
          variant="tertiary"
          class={clsx({ "dso-open": !!this.active, "dso-info-secondary": !!this.secondary })} // ToDO fix the secondary class/variant
          accessibleLabel={this.label}
          onClick={(e) => this.handleToggle(e)}
          icon={this.active || this.hover ? "info-active" : "info"}
          ref={(element) => (this.button = element)}
        />
      </Host>
    );
  }
}
