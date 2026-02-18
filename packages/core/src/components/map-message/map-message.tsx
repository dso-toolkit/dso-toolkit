import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

import { MapMessageActionClickEvent } from "./map-message.interfaces";

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

  private updateButtonRowMargin = () => {
    const root = this.host.shadowRoot;
    if (!root) {
      return;
    }

    const container = root.querySelector<HTMLElement>(".dso-map-message-content");
    if (!container || this.variant === "instruction") {
      return;
    }

    const buttonRow = container.querySelector<HTMLElement>(".dso-button-row");
    const body = container.querySelector<HTMLElement>(".dso-map-message-body");
    if (!buttonRow || !body) {
      return;
    }

    const isWrapped = buttonRow.offsetTop > body.offsetTop;
    buttonRow.style.setProperty("margin-inline-start", isWrapped ? "32px" : "8px");
  };

  componentDidLoad() {
    this.updateButtonRowMargin();
    window.addEventListener("resize", this.updateButtonRowMargin.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.updateButtonRowMargin.bind(this));
  }

  componentDidUpdate() {
    this.updateButtonRowMargin();
  }

  // Returns button configuration based on variant
  private getButtonConfig(): Array<{ label: string; class: string; icon: string }> {
    if (this.variant === "success") {
      return [
        {
          label: this.buttonLabels[0] || "Ongedaan maken",
          class: "dso-action-button dso-primary",
          icon: "undo",
        },
        {
          label: this.buttonLabels[1] || "Volgende",
          class: "dso-action-button dso-secondary",
          icon: "chevron-right",
        },
      ];
    }

    // Variant error
    return [
      {
        label: this.buttonLabels[0] || "Sluiten",
        class: "dso-action-button dso-primary",
        icon: "times",
      },
      {
        label: this.buttonLabels[1] || "Opnieuw proberen",
        class: "dso-action-button dso-secondary",
        icon: "undo",
      },
    ];
  }

  private renderButtons() {
    const buttons = this.getButtonConfig();

    return (
      <div class="dso-map-message-actions" aria-label="Acties voor melding">
        <div class="dso-button-row">
          {buttons.map((btn, idx) => (
            <button
              type="button"
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
            <div class="dso-map-message-body">
              {this.variant !== "instruction" && (
                <dso-icon icon={`status-${this.variant}`} aria-hidden="true"></dso-icon>
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
