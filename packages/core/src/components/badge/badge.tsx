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
   * Show Badge in active state
   */
  @Prop()
  active?: boolean;

  /**
   * Show Badge in hovered state
   */
  @Prop()
  hovered?: boolean;

  /**
   * Show Badge in hovered state
   */
  @Prop()
  toggled?: boolean;

  render() {
    return (
      <span
        class={clsx(
          "dso-badge",
          { [`badge-${this.status}`]: this.status },
          { active: this.active, hovered: this.hovered, toggled: this.toggled },
        )}
      >
        <slot></slot>
      </span>
    );
  }
}
