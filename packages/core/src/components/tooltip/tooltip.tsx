import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true
})
export class Tooltip {
  @Prop()
  position?: string;

  @Prop()
  label?: string;

  render() {
    const classes = clsx(
      'tooltip',
      this.position,
      'fade in'
    );

    return (
      <div class={classes} role="tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-inner">{ this.label }</div>
      </div>
    );
  }
}
