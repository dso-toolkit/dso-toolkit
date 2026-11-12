import { Component, ComponentInterface, Host, h } from "@stencil/core";

/**
 * @slot - Content to be displayed inside the cursor tooltip.
 */
@Component({
  tag: "dso-cursor-tooltip",
  styleUrl: "cursor-tooltip.scss",
  shadow: true,
})
export class CursorTooltip implements ComponentInterface {
  render() {
    return (
      <Host class="dso-cursor-tooltip">
        <slot />
      </Host>
    );
  }
}
