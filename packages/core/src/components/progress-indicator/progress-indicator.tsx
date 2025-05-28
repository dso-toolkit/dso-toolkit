import { Component, Element, Host, Prop, h } from "@stencil/core";

import { i18n } from "../../utils/i18n";

import { translations } from "./progress-indicator.i18n";

@Component({
  tag: "dso-progress-indicator",
  styleUrl: "progress-indicator.scss",
  shadow: true,
})
export class Progressindicator {
  @Element()
  host!: HTMLDsoProgressIndicatorElement;

  /**
   * The label of the Progress Indicator.
   */
  @Prop()
  label?: string;

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
  @Prop({ reflect: true })
  block?: boolean;

  private text = i18n(() => this.host, translations);

  render() {
    return (
      <Host>
        <span class="dso-progress-indicator-spinner" role="progressbar" aria-labelledby="progress-indicator-label">
          <dso-icon icon="spinner"></dso-icon>
        </span>
        <span id="progress-indicator-label" class="dso-progress-indicator-label">
          {this.label || this.text("label")}
        </span>
      </Host>
    );
  }
}
