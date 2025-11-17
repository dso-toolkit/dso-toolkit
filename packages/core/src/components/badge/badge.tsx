import { Component, Prop, h } from "@stencil/core";
import { clsx } from "clsx";

import { BadgeStatus } from "./badge.interfaces";

@Component({
  tag: "dso-badge",
  styleUrl: "badge.scss",
  shadow: true,
})
export class Badge {
  /**
   * The status of the Badge.
   */
  @Prop()
  status?: BadgeStatus;

  render() {
    return (
      <span class={clsx("dso-badge", { [`badge-${this.status}`]: this.status })}>
        <slot></slot>
      </span>
    );
  }
}
