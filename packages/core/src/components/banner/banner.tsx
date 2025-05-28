import { Component, Prop, h } from "@stencil/core";
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
   * *Icon can only be hidden when the 'compact' property is set to true.
   *
   * Option to show banner icon.
   */
  @Prop({ reflect: true })
  icon = false;

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
