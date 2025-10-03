import { Component, ComponentInterface, Fragment, h } from "@stencil/core";

@Component({
  tag: "dso-tijdreis-banner",
  styleUrl: "tijdreis-banner.scss",
  shadow: true,
})
export class TijdreisBanner implements ComponentInterface {
  render() {
    return (
      <Fragment>
        <dso-icon icon="clock" />
        <slot></slot>
        <slot name="button"></slot>
      </Fragment>
    );
  }
}
