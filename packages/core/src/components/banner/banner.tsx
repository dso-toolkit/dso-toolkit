import { Component, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

import { IconAlias } from "../icon/icon.interfaces";

type BannerStatusType = "success" | "error" | "info" | "warning";

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
  status!: "success" | "error" | "info" | "warning";

  /**
   * Compact mode.
   */
  @Prop({ reflect: true })
  compact = false;

  /**
   * *Icon can only be hidden when the 'compact' property is set to true.
   *
   * Option to show banner icon.
   */
  @Prop({ reflect: true })
  icon = false;

  private statusIcons: Record<BannerStatusType, IconAlias> = {
    error: "status-error",
    info: "status-info-solid",
    success: "status-success",
    warning: "status-warning",
  };

  render() {
    return (
      <section
        class={clsx("dso-banner", `alert-${this.status}`, {
          "dso-compact": this.compact,
        })}
        role="alert"
      >
        <div class={clsx("banner-inner", { icon: this.icon })}>
          {(this.icon || !this.compact) && <dso-icon icon={this.statusIcons[this.status]}></dso-icon>}
          <slot></slot>
        </div>
      </section>
    );
  }
}
