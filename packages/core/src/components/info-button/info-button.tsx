import { Component, Event, EventEmitter, Host, Method, Prop, State, h } from "@stencil/core";

import { InfoButtonToggleEvent } from "./info-button.interfaces";

@Component({
  tag: "dso-info-button",
  shadow: true,
  styleUrl: "info-button.scss",
})
export class InfoButton {
  private button?: HTMLDsoIconButtonElement;
  private buttonSecondary?: HTMLButtonElement;

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
    this.button?.setFocus();
    this.buttonSecondary?.focus();
  }

  private handleToggle(originalEvent: MouseEvent) {
    this.active = !this.active;
    this.dsoToggle.emit({ originalEvent, active: this.active });
  }

  render() {
    return (
      <Host onMouseenter={() => (this.hover = true)} onMouseleave={() => (this.hover = false)}>
        {!this.secondary ? (
          <dso-icon-button
            variant="tertiary"
            label={this.label}
            onDsoClick={(e) => this.handleToggle(e.detail.originalEvent)}
            icon={this.active || this.hover ? "info-active" : "info"}
            ref={(element) => (this.button = element)}
          />
        ) : (
          // ToDo: remove this part in https://github.com/dso-toolkit/dso-toolkit/issues/3350. Tertiary on color already working
          <button
            type="button"
            class="dso-info-secondary"
            aria-expanded={typeof this.active === "boolean" ? this.active.toString() : undefined}
            onClick={(e) => this.handleToggle(e)}
            ref={(element) => (this.buttonSecondary = element)}
          >
            <dso-icon icon={this.active || this.hover ? "info-active" : "info"}></dso-icon>
            <span class="sr-only">{this.label}</span>
          </button>
        )}
      </Host>
    );
  }
}
