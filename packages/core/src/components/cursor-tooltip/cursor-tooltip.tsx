import { Component, ComponentInterface, h } from "@stencil/core";

@Component({
  tag: "dso-cursor-tooltip",
  styleUrl: "cursor-tooltip.scss",
  shadow: true,
})
export class CursorTooltip implements ComponentInterface {
  render() {
    return (
      <div class="dso-tooltip">
        <span class="tooltip-arrow"></span>
        <div class="tooltip-inner">
          <slot />
        </div>
      </div>
    );
  }
}
