import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "dso-progress-indicator",
  styleUrl: "progress-indicator.scss",
  shadow: true,
})
export class Progressindicator {
  /**
   * The label of the Progress Indicator.
   */
  @Prop()
  label = "Resultaten laden: een moment geduld alstublieft.";

  /**
   * The size (width) of the Progress Indicator.
   *
   * If no size is set, falls back to `small`.
   */
  @Prop({ reflect: true })
  size?: "small" | "medium" | "large";

  /**
   * Set for bloatier Progress Indicator.
   */
  @Prop()
  block?: boolean;

  render() {
    return (
      <Host>
        <span class="dso-progress-indicator-spinner" role="progressbar" aria-labelledby="progress-indicator-label">
          {/* Keep in sync with /packages/css/src/components/progress-indicator/progress-indicator.scss */}
          <dso-icon icon="progress-indicator"></dso-icon>
        </span>
        <span id="progress-indicator-label" class="dso-progress-indicator-label">
          {this.label}
        </span>
      </Host>
    );
  }
}
