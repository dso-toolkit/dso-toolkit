import { Component, Prop, h } from "@stencil/core";
import clsx from "clsx";

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
  @Prop({ reflect: true })
  status?: BadgeStatus;

  /**
   * @internal
   *
   * Show Badge in active state
   */
  @Prop({ reflect: true })
  _active?: boolean;

  /**
   * @internal
   *
   * Show Badge in hover state
   */
  @Prop({ reflect: true })
  _hover?: boolean;

  /**
   * @internal
   *
   * Show Badge in toggled state
   */
  @Prop({ reflect: true })
  _toggled?: boolean;

  render() {
    return (
      <span class={clsx("dso-badge", { [`badge-${this.status}`]: this.status })}>
        <slot></slot>
      </span>
    );
  }
}
