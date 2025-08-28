import { Component, ComponentInterface, Host, h } from "@stencil/core";

@Component({
  tag: "dso-history-item-list",
  styleUrl: "history-item-list.scss",
  shadow: true,
})
export class HistoryItemList implements ComponentInterface {
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
