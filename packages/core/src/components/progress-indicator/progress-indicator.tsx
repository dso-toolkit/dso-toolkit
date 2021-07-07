import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-progress-indicator',
  styleUrl: 'progress-indicator.scss',
  shadow: true
})
export class Progressindicator {
  @Prop()
  status?: string;

  @Prop()
  size?: string;

  @Prop()
  block?: boolean;

  @Prop()
  color?: string;

  render() {
    return (
      <div
        class={clsx('dso-progress-indicator', 'dso-progress-indicator-looping', { [`dso-${this.size}`]: this.size, 'dso-block': this.block, 'dso-color': this.color })}
        role="progressbar"
        aria-valuetext={this.status}
      >
        <div class="dso-progress-indicator-spinner"></div>
        <span class="dso-progress-indicator-label">
          <slot>{`${status}%`}</slot>
        </span>
      </div>
    );
  }
}
