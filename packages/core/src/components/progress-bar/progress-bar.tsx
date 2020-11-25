import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dso-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true
})
export class ProgressBar {
  @Prop()
  progressLabel?: string;

  @Prop()
  progress!: number;

  @Prop()
  valueMin!: number;

  @Prop()
  valueMax!: number;


  render() {
    const progressWidth = {
      width: `${this.progress}%`
    }

    return (
      <div class="progress">
        <div class="progress-bar" role="progressbar" aria-valuenow={this.progress} aria-valuemin={this.valueMin} aria-valuemax={this.valueMax} style={progressWidth}>
          {this.progressLabel ? <span>{this.progressLabel}</span> : <span>{this.progress}%</span>}
        </div>
      </div>
    );
  }
}
