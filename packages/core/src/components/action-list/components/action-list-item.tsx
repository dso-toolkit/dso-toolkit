import { h, Component, ComponentInterface, Host, Prop } from "@stencil/core";

@Component({
  tag: "dso-action-list-item",
  styleUrl: "action-list-item.scss",
  shadow: true,
})
export class ActionListItem implements ComponentInterface {
  @Prop()
  step!: number;

  @Prop()
  itemTitle?: string;

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
        }}
      >
        {this.warning ? <dso-icon icon="status-warning"></dso-icon> : <div class="dso-step-counter">{this.step}</div>}
        {this.itemTitle && <h3>{this.itemTitle}</h3>}
        <slot />
      </Host>
    );
  }
}
