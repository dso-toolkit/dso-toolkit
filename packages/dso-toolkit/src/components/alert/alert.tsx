import { Component, Element, Event, EventEmitter, Fragment, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

import { i18n } from "../../utils/i18n";

import { translations } from "./alert.i18n";
import { AlertCloseEvent } from "./alert.interfaces";

/**
 * @slot - A slot for the main content body of the alert message.
 */
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
    const isValidStatus = ["success", "info", "warning", "error"].includes(this.status);
    if (!isValidStatus) {
      console.warn(`Invalid status ${this.status}`);
    }

    return (
      <div
        class={clsx("alert", { [`alert-${this.status}`]: isValidStatus }, { "dso-compact": this.compact })}
        role={this.roleAlert ? "alert" : undefined}
      >
        {isValidStatus && (
          <>
            {!this.compact && (
              <dso-icon
                class="icon-status"
                icon={`status-${this.status === "info" ? "info-solid" : this.status}`}
                aria-hidden="true"
              />
            )}
            <span class="sr-only">{this.text(this.status)}:</span>
          </>
        )}
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
