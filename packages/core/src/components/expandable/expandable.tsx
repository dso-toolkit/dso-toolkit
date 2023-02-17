import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "dso-expandable",
  styleUrl: "expandable.scss",
  shadow: true,
})
export class Expandable {
  @Prop({ reflect: true })
  open?: boolean;

  render() {
    return (
      <Host aria-hidden={this.open ? "false" : "true"}>
        <slot />
      </Host>
    );
  }
}
