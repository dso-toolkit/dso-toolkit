import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from "@stencil/core";

import { ButtonConfig, MapMessageActionClickEvent } from "./map-message.interfaces";

@Component({
  tag: "dso-map-message",
  styleUrl: "map-message.scss",
  shadow: true,
})
export class MapMessage implements ComponentInterface {
  @Element()
  host!: HTMLDsoMapMessageElement;

  /**
   * Variant determines the icon and actions shown.
   * Allowed values: "success", "error", "instruction".
   * Default is "instruction".
   */
  @Prop({ reflect: true })
  variant: "success" | "error" | "instruction" = "instruction";

  /**
   * The message text to display in the map message component.
   */
  @Prop({ reflect: true })
  message: string = "";

  /**
   * The labels for the action buttons in the map message component.
   */
  @Prop()
  buttonLabels: string[] = [];

  /**
   * Emitted when an action button is activated in the map message component.
   */
  @Event({ bubbles: false })
  dsoActionClick!: EventEmitter<MapMessageActionClickEvent>;

  // Returns button configuration based on variant
  private getButtonConfig(): ButtonConfig[] {
    if (this.variant === "instruction") {
      return [];
    }

    if (this.variant === "success") {
      return [
        {
          label: this.buttonLabels[0] || "Ongedaan maken",
          class: "dso-action-button dso-primary",
          icon: "undo",
          type: "button",
          iconMode: "after",
        },
        {
          label: this.buttonLabels[1] || "Volgende",
          class: "dso-action-button dso-secondary",
          icon: "chevron-right",
          type: "button",
          iconMode: "after",
        },
      ];
    }

    // Variant error
    return [
      {
        label: this.buttonLabels[0] || "Sluiten",
        class: "dso-action-button dso-primary",
        icon: "times",
        iconMode: "after",
        type: "button",
      },
      {
        label: this.buttonLabels[1] || "Opnieuw proberen",
        class: "dso-action-button dso-secondary",
        icon: "undo",
        iconMode: "after",
        type: "button",
      },
    ];
  }

  private renderButtons() {
    const buttons = this.getButtonConfig();

    if (!buttons.length) {
      return null;
    }

    return (
      <div class="dso-button-row" role="group" aria-label="Acties voor melding">
        {buttons.map((btn, idx) => (
          <button
            type={btn.type}
            class={btn.class}
            onClick={(event) => this.dsoActionClick.emit({ actionIndex: idx, originalEvent: event })}
          >
            <span>{btn.label}</span>
            {btn.iconMode === "after" && <dso-icon icon={btn.icon} />}
          </button>
        ))}
      </div>
    );
  }

  render() {
    const isError = this.variant === "error";
    const liveRole = isError ? "alert" : "status";
    const hasActions = this.variant !== "instruction";
    return (
      <Host>
        <dso-highlight-box>
          <div
            class={`dso-map-message-content variant-${this.variant} ${hasActions ? "has-actions" : ""}`}
            role={liveRole}
            aria-atomic="true"
          >
            <div class="dso-map-message-body">
              {this.variant !== "instruction" && (
                <dso-icon class="dso-map-message-icon" icon={`status-${this.variant}`} aria-hidden="true"></dso-icon>
              )}
              <span class="dso-map-message-text">{this.message}</span>
            </div>
            {this.variant !== "instruction" && this.renderButtons()}
          </div>
        </dso-highlight-box>
      </Host>
    );
  }
}
