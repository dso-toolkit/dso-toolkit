import { Component, ComponentInterface, h } from "@stencil/core";

// import {  } from "./legend.interfaces";
// import { translations } from "./legend.i18n";

@Component({
  tag: "dso-legend",
  styleUrl: "legend.scss",
  shadow: true,
})
export class Legend implements ComponentInterface {
  render() {
    return <div>legend</div>;
  }
}
