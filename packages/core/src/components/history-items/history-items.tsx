import { Component, ComponentInterface, Fragment, h } from "@stencil/core";

/**
 * @slot - The slot to place one or more History Items in.
 * @slot headings - The slot to place the headings in. Must be an array of 2 strings.
 */
@Component({
  tag: "dso-history-items",
  styleUrl: "history-items.scss",
  shadow: true,
})
export class HistoryItems implements ComponentInterface {
  render() {
    return (
      <Fragment>
        <div class="headings">
          <slot name="headings"></slot>
        </div>
        <ul class="history-items">
          <slot></slot>
        </ul>
      </Fragment>
    );
  }
}
