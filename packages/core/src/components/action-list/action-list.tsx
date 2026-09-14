import { Component, ComponentInterface, Host, Prop, h } from "@stencil/core";

/**
 * @slot - A slot for action list items.
 */
@Component({
  tag: "dso-action-list",
  styleUrl: "action-list.scss",
  shadow: true,
})
export class ActionList implements ComponentInterface {
  /**
   * The title.
   */
  @Prop()
  listTitle!: string;

  render() {
    return (
      <Host>
        <h2>{this.listTitle}</h2>
        <ol class="dso-action-list-content">
          <slot />
        </ol>
      </Host>
    );
  }
}
