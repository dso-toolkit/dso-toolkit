import { Component, ComponentInterface, Host, Prop, h } from "@stencil/core";
// import clsx from "clsx";

@Component({
  tag: "dso-logo",
  styleUrl: "logo.scss",
  shadow: true,
})
export class Logo implements ComponentInterface {
  @Prop()
  label?: string;

  @Prop()
  ribbon?: string;

  // TODO: returns undefined, undefined- why?
  render() {
    return (
      <Host>
        Label: {this.label} <br />
        Ribbon: {this.ribbon}
      </Host>
    );
  }
}
