import { Component, ComponentInterface, Host, h } from "@stencil/core";

@Component({
  tag: "dso-history-items",
  styleUrl: "history-items.scss",
  shadow: true,
})
export class HistoryItems implements ComponentInterface {
  render() {
    return (
      <Host>
        <div class="heading">
          <slot name="heading"></slot>
        </div>
        <slot></slot>
      </Host>
    );
  }
}
