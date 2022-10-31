import { Component, h, Prop } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "dso-banner",
  styleUrl: "banner.scss",
  shadow: true,
})
export class Banner {
  @Prop()
  status!: "warning" | "danger";

  render() {
    return (
      <section class={clsx("dso-banner", `alert-${this.status}`)} role="alert">
        <slot></slot>
      </section>
    );
  }
}
