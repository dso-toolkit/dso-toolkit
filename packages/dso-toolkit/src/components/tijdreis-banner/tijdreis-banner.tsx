import { Component, ComponentInterface, Fragment, h } from "@stencil/core";

/**
 * @slot - A slot to place the primary banner text or message.
 * @slot button - A slot to place an action button in.
 */
@Component({
  tag: "dso-tijdreis-banner",
  styleUrl: "tijdreis-banner.scss",
  shadow: true,
})
export class TijdreisBanner implements ComponentInterface {
  render() {
    return (
      <Fragment>
        <dso-icon icon="clock-outline" />
        <slot></slot>
        <slot name="button"></slot>
      </Fragment>
    );
  }
}
