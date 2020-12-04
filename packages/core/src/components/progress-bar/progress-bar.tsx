import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dso-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true
})
export class ProgressBar {
  @Prop()
  progress!: number;

  @Prop()
  min = 0;

  @Prop()
  max = 100;

  render() {
    const progress = Math.round(this.progress / this.max * 100);

    return (
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={this.min}
          aria-valuemax={this.max}
          style={{ width: `${progress}%` }}
        >
          <span>
            <slot>{`${progress}%`}</slot>
          </span>
        </div>
      </div>
    );
  }
}
