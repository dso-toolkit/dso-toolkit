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
  @Prop()
  status!: "success" | "info" | "warning" | "danger";

  /**
   * Whether or not to show the role attribute with value "alert". To control the tooltip add the `role-alert` attribute.
   */
  @Prop()
  roleAlert?: boolean;

  private static statusMap = new Map<string, string>([
    ["success", "Gelukt"],
    ["info", "Opmerking"],
    ["warning", "Waarschuwing"],
    ["danger", "Fout"],
  ]);

  render() {
    const status = Alert.statusMap.get(this.status);
    if (!status) {
      throw new Error(`Invalid status ${this.status}`);
    }

    return (
      <div class={clsx("alert", `alert-${this.status}`)} role={this.roleAlert ? "alert" : undefined}>
        <dso-icon icon={"status-" + this.status}></dso-icon>
        <span class="sr-only">{status}:</span>
        <slot></slot>
      </div>
    );
  }
}
