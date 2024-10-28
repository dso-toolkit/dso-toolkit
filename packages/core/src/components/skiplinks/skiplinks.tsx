import { Component, ComponentInterface, h, Prop } from "@stencil/core";

// import {  } from "./skiplinks.interfaces";

@Component({
  tag: "dso-skiplinks",
  styleUrl: "skiplinks.scss",
  shadow: true,
})
export class Skiplinks implements ComponentInterface {
  /**
   * The URL to which the Card heading links.
   */
  @Prop({ reflect: true })
  to!: string | undefined;

  /**
   * link text
   */

  @Prop({ reflect: true })
  label?: string;

  render() {
    return (
      <a href="#{this.to}" class="dso-skip">
        {this.label}
        <dso-icon icon="chevron-right"></dso-icon>
      </a>
    );
  }
}
