import { Component, Element, h, Prop } from "@stencil/core";
import clsx from "clsx";
import { getLocaleComponentStrings, i18nStrings } from "../../utils/i18n";

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

  @Element()
  host!: HTMLDsoAlertElement;

  private i18nStrings: i18nStrings | undefined;

  async componentWillLoad(): Promise<void> {
    this.i18nStrings = await getLocaleComponentStrings(this.host);
  }

  render() {
    const status = this.i18nStrings?.[this.status];
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
