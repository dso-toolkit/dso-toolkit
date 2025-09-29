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
        <button type="button" class="dso-secondary dso-extra-small">
          <span>Terug naar vandaag</span>
          <dso-icon icon="undo" />
        </button>
      </Fragment>
    );
  }
}
