import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "dso-progress-bar",
  styleUrl: "progress-bar.scss",
  shadow: true,
})
export class ProgressBar {
  /**
   * The current progress. Should be between `min` and `max`.
   */
  @Prop()
  progress!: number;

  /**
   * From where progress is made.
   */
  @Prop()
  min = 0;

  /**
   * When the operation completes.
   */
  @Prop()
  max = 100;

  render() {
    const progressNumber = Math.round(this.progress);
    const progressPercentage = `${progressNumber}%`;

    return (
      <div class="progress">
        <span
          class="progress-bar"
          role="progressbar"
          aria-labelledby="progress-bar-label"
          aria-valuenow={progressNumber}
          aria-valuemin={this.min}
          aria-valuemax={this.max}
        >
          <span style={{ width: `${progressPercentage}` }}></span>
        </span>
        <span id="progress-bar-label">
          <slot></slot>
        </span>
      </div>
    );
  }
}
