import { Component, ComponentInterface, h, Prop } from "@stencil/core";

@Component({
  tag: "dso-skiplink",
  styleUrl: "skiplink.scss",
  shadow: true,
})
export class Skiplink implements ComponentInterface {
  /**
   * The location to which the skiplink links.
   */
  @Prop({ reflect: true })
  to!: string | undefined;

  /**
   * link text
   */
  @Prop({ reflect: true })
  label!: string;

  render() {
    return (
      <a href={`#${this.to}`}>
        {this.label}
        <dso-icon icon="chevron-right"></dso-icon>
      </a>
    );
  }
}
