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
    const progressNumber = Math.round(this.progress / this.max * 100);
    const progressPercentage = `${progressNumber}%`

    return (
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          aria-labelledby="progress-bar-label"
          aria-valuenow={progressNumber}
          aria-valuemin={this.min}
          aria-valuemax={this.max}
          style={{ width: `${progressPercentage}` }}
        >
          <span id="progress-bar-label">
            <slot></slot>
          </span>
        </div>
      </div>
    );
  }
}
