import { Component, ComponentInterface, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "dso-action-list-item",
  styleUrl: "action-list-item.scss",
  shadow: true,
})
export class ActionListItem implements ComponentInterface {
  /**
   * The step of the Action List Item.
   */
  @Prop()
  step!: number;

  /**
   * The title of the item.
   */
  @Prop()
  itemTitle?: string;

  /**
   * Show flow line to next step
   */
  @Prop()
  flowLine = false;

  /**
   * When there is a warning.
   */
  @Prop()
  warning = false;

  /**
   * Places a dashed line at the bottom of the item.
   */
  @Prop()
  divider = false;

  render() {
    return (
      <Host
        class={{
          divider: this.divider,
          "flow-line": this.flowLine,
        }}
      >
        <div class="dso-action-list-item">
          {this.warning ? <dso-icon icon="status-warning"></dso-icon> : <div class="dso-step-counter">{this.step}</div>}
          <div class="action-list-item-content">
            {this.itemTitle && <h3>{this.itemTitle}</h3>}
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
