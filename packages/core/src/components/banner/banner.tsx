import { Component, h, Prop } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "dso-banner",
  styleUrl: "banner.scss",
  shadow: true,
})
export class Banner {
  /**
   * The status of the banner.
   */
  @Prop({ reflect: true })
  status!: "danger" | "error" | "info" | "warning";

  /**
   * Compact mode.
   */
  @Prop()
  compact = false;

  /**
   * Option to hide banner icon.
   */
  @Prop()
  noIcon = true;

  render() {
    return (
      <section
        class={clsx("dso-banner", `alert-${this.status}`, {
          "dso-compact": this.compact,
        })}
        role="alert"
      >
        <slot></slot>
      </section>
    );
  }
}
