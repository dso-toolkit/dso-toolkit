import { h, Component, Fragment } from '@stencil/core';

@Component({
  tag: 'dso-toggletip',
  styleUrl: 'toggletip.scss',
  shadow: true
})
export class Toggletip {
  render() {
    return (
      <>
        <button type="button" id="toggle">
          <dso-icon icon="info"></dso-icon>
        </button>
        <dso-tooltip for="toggle">
          <slot />
        </dso-tooltip>
      </>
    );
  }
}
