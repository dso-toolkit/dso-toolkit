import { Component, ComponentInterface, Fragment, Prop, h } from "@stencil/core";

/**
 * @slot - The slot to place one or more History Items in.
 */
@Component({
  tag: "dso-history-items",
  styleUrl: "history-items.scss",
  shadow: true,
})
export class HistoryItems implements ComponentInterface {
  /**
   * The label of the list of History Items
   */
  @Prop()
  label: string | undefined;

  render() {
    return (
      <Fragment>
        <div class="label">{this.label}</div>
        <ul class="history-items">
          <slot></slot>
        </ul>
      </Fragment>
    );
  }
}
