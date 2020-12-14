import { Component, h, Prop } from '@stencil/core';
import clsx from 'clsx';

@Component({
  tag: 'dso-progress-indicator',
  styleUrl: 'progress-indicator.scss',
  shadow: true
})
export class ProgressBar {
  @Prop()
  progress!: number;

  @Prop()
  size?: string;

  @Prop()
  status?: string;

  render() {
    const classes = clsx(
      'dso-progress-indicator',
      'dso-progress-indicator-looping',
      'dso-' + this.size
    );

    return (
      <div class={classes}
        role="progressbar" 
        aria-valuetext={this.status}>
        <div class="dso-progress-indicator-spinner"></div>
        <span class="dso-progress-indicator-label">{this.status}</span>
      </div>
    );
  }
}
