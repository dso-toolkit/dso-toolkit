import { Component, Element, Event, EventEmitter, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

import { i18n } from "../../utils/i18n";

import { translations } from "./alert.i18n";
import { AlertCloseEvent } from "./alert.interfaces";

@Component({
  tag: "dso-alert",
  styleUrl: "alert.scss",
  shadow: true,
})
export class Alert {
  @Element()
  host!: HTMLDsoAlertElement;

  /**
   * Set status of alert
   */
  @Prop({ reflect: true })
  status!: "success" | "info" | "warning" | "error";

  /**
   * Whether or not to show the role attribute with value "alert". To control the tooltip add the `role-alert` attribute.
   */
  @Prop()
  roleAlert?: boolean;

  /**
   * Show alert as compact variant (without icon)
   */
  @Prop({ reflect: true })
  compact?: boolean;

  /**
   * When `false` the close button in the alert will not be rendered.
   */
  @Prop()
  closable = false;

  /**
   * Emitted when the user closes the Alert.
   */
  @Event()
  dsoClose!: EventEmitter<AlertCloseEvent>;

  private text = i18n(() => this.host, translations);

  render() {
    const status = this.text(this.status);
    if (!status) {
      throw new Error(`Invalid status ${this.status}`);
    }

    return (
      <div
        class={clsx("alert", `alert-${this.status}`, { "dso-compact": this.compact })}
        role={this.roleAlert ? "alert" : undefined}
      >
        {!this.compact && (
          <dso-icon class="icon-status" icon={`status-${this.status === "info" ? "info-solid" : this.status}`} />
        )}
        <span class="sr-only">{status}:</span>
        <slot></slot>

        {this.closable && (
          <dso-icon-button
            label={this.text("close")}
            variant="tertiary"
            icon="cross"
            onDsoClick={(e) => this.dsoClose.emit({ originalEvent: e })}
          />
        )}
      </div>
    );
  }
}
