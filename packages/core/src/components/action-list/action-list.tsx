import { h, Component, Host, ComponentInterface, Prop } from "@stencil/core";

@Component({
  tag: "dso-action-list",
  styleUrl: "action-list.scss",
  shadow: true,
})
export class ActionList implements ComponentInterface {
  @Prop()
  listTitle!: string;

  render() {
    return (
      <Host>
        <h2>{this.listTitle}</h2>
        <div class="dso-action-list-content">
          <slot />
        </div>
      </Host>
    );
  }
}
