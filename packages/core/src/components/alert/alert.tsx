import { Component, h, Prop } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "dso-alert",
  styleUrl: "alert.scss",
  shadow: true,
})
export class Alert {
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

  private static statusMap = new Map<string, string>([
    ["success", "Gelukt"],
    ["info", "Opmerking"],
    ["warning", "Waarschuwing"],
    ["error", "Fout"],
  ]);

  render() {
    const status = Alert.statusMap.get(this.status);
    if (!status) {
      throw new Error(`Invalid status ${this.status}`);
    }

    return (
      <div
        class={clsx("alert", `alert-${this.status}`, { "dso-compact": this.compact })}
        role={this.roleAlert ? "alert" : undefined}
      >
        {!this.compact && <dso-icon icon={"status-" + this.status}></dso-icon>}
        <span class="sr-only">{status}:</span>
        <slot></slot>
      </div>
    );
  }
}
