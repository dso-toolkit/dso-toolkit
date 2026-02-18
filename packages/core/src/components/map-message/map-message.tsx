import { Component, ComponentInterface, Event, EventEmitter, Host, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

import { MapMessageActionClickEvent } from "./map-message.interfaces";

@Component({
  tag: "dso-map-message",
  styleUrl: "map-message.scss",
  shadow: true,
})
export class MapMessage implements ComponentInterface {
  // Variant determines the icon and actions shown
  /**
   * Variant determines the icon and actions shown.
   * Allowed values: "success", "error", "introduction".
   * Default is "introduction".
   */
  @Prop({ reflect: true })
  variant: "success" | "error" | "introduction" = "introduction";

  /**
   * The message text to display in the map message component.
   */
  @Prop({ reflect: true })
  message: string = "";

  // The labels for action buttons
  /**
   * The labels for the action buttons in the map message component.
   */
  @Prop({ reflect: true })
  buttonLabels: string[] = [];

  // Emitted when an action button is activated.
  /**
   * Emitted when an action button is activated in the map message component.
   */
  @Event({ bubbles: false })
  dsoActionClick!: EventEmitter<MapMessageActionClickEvent>;

  // Returns button configuration based on variant
  private getButtonConfig(): Array<{ label: string; class: string; icon: string }> {
    if (this.variant === "success") {
      return [
        { label: this.buttonLabels[0] || "Ongedaan maken", class: "dso-action-button", icon: "undo" },
        {
          label: this.buttonLabels[1] || "Volgende",
          class: "dso-action-button dso-action-button-secondary",
          icon: "chevron-right",
        },
      ];
    }
    if (this.variant === "error") {
      return [
        { label: this.buttonLabels[0] || "Sluiten", class: "dso-action-button", icon: "times" },
        {
          label: this.buttonLabels[1] || "Opnieuw proberen",
          class: "dso-action-button dso-action-button-secondary",
          icon: "undo",
        },
      ];
    }
    return [];
  }

  private renderButtons() {
    const buttons = this.getButtonConfig();
    if (!buttons.length) return null;
    return (
      <div class="dso-map-message-actions" aria-label="Acties voor melding">
        <div class="dso-button-row">
          {buttons.map((btn, idx) => (
            <button
              class={btn.class}
              onClick={(event) => this.dsoActionClick.emit({ actionIndex: idx, originalEvent: event })}
            >
              <span>{btn.label}</span>
              <dso-icon icon={btn.icon} />
            </button>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const isError = this.variant === "error";
    const liveRole = isError ? "alert" : "status";
    return (
      <Host>
        <dso-highlight-box>
          <div
            class={clsx("dso-map-message-content", `variant-${this.variant}`, "background-dark")}
            role={liveRole}
            aria-atomic="true"
          >
            <div>
              {this.variant !== "introduction" && (
                <dso-icon icon={`status-${this.variant}`} aria-hidden="true"></dso-icon>
              )}
              <span class="dso-map-message-text">{this.message}</span>
            </div>
            {this.renderButtons()}
          </div>
        </dso-highlight-box>
      </Host>
    );
  }
}
