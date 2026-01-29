import { Component, ComponentInterface, Host, h } from "@stencil/core";

@Component({
  tag: "dso-cursor-tooltip",
  styleUrl: "cursor-tooltip.scss",
  shadow: true,
})
export class CursorTooltip implements ComponentInterface {
  render() {
    return (
      <Host class="dso-cursor-tooltip">
        <span>
          <slot />
        </span>
      </Host>
    );
  }
}
