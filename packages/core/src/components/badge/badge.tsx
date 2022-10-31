import { Component, h, Prop } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "dso-badge",
  styleUrl: "badge.scss",
  shadow: true,
})
export class Badge {
  @Prop()
  status?: "primary" | "success" | "info" | "warning" | "danger" | "outline";

  render() {
    return (
      <span class={clsx("dso-badge", { [`badge-${this.status}`]: this.status })}>
        <slot></slot>
      </span>
    );
  }
}
