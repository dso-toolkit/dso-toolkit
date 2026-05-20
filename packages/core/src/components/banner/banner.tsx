import { Component, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

import { IconAlias } from "../icon/icon.interfaces";

@Component({
  tag: "dso-banner",
  styleUrl: "banner.scss",
  shadow: true,
})
export class Banner {
  private statusIconMap: Record<string, IconAlias> = {
    success: "status-success",
    error: "status-error",
    info: "status-info-solid",
    warning: "status-warning",
  };

  /**
   * The status of the banner.
   */
  @Prop({ reflect: true })
  status!: "success" | "error" | "info" | "warning";

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
    const iconName = this.statusIconMap[this.status];
    return (
      <section
        class={clsx("dso-banner", `alert-${this.status}`, {
          "dso-compact": this.compact,
        })}
        role="alert"
      >
        <div class="dso-banner-inner">
          {this.icon && <dso-icon icon={iconName} aria-hidden="true"></dso-icon>}
          <slot></slot>
        </div>
      </section>
    );
  }
}
