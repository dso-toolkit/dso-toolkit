import { h, Component, Event, Prop, EventEmitter, Method, Host, State } from "@stencil/core";
import clsx from "clsx";

import { InfoButtonToggleEvent } from "./info-button.interfaces";

@Component({
  tag: "dso-info-button",
  shadow: true,
  styleUrl: "info-button.scss",
})
export class InfoButton {
  private button?: HTMLButtonElement;

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
        <button
          type="button"
          class={clsx({ "dso-open": !!this.active, "dso-info-secondary": !!this.secondary })}
          aria-expanded={typeof this.active === "boolean" ? this.active.toString() : undefined}
          onClick={(e) => this.handleToggle(e)}
          ref={(element) => (this.button = element)}
        >
          <dso-icon icon={this.active || this.hover ? "info-active" : "info"}></dso-icon>
          <span class="sr-only">{this.label}</span>
        </button>
      </Host>
    );
  }
}
