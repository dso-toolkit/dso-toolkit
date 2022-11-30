import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "dso-progress-indicator",
  styleUrl: "progress-indicator.scss",
  shadow: true,
})
export class Progressindicator {
  @Prop()
  label?: string;

  @Prop({ reflect: true })
  size?: "small" | "medium" | "large";

  @Prop()
  block?: boolean;

  render() {
    const label = this.label ?? "Resultaten laden: een moment geduld alstublieft.";

    return (
      <Host>
        <span class="dso-progress-indicator-spinner" role="progressbar" aria-labelledby="progress-indicator-label">
          {/* Keep in sync with /packages/css/src/components/progress-indicator/progress-indicator.scss */}
          <svg class="spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <style>
              {`
                .spinner { animation: rotator 8s linear infinite; transform-origin: center; }
                @keyframes rotator { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .path { stroke-dasharray: 265; stroke-dashoffset: 0; transform-origin: center; stroke: #39870c; animation: dash 2s ease-in-out infinite; }
                @keyframes dash { 0% { stroke-dashoffset: 265; } 50% { stroke-dashoffset: 65; transform:rotate(90deg); } 100% { stroke-dashoffset: 265; transform:rotate(360deg); }
              `}
            </style>
            <circle class="path" fill="none" stroke-width="10" stroke-linecap="butt" cx="50" cy="50" r="45"></circle>
          </svg>
        </span>
        <span id="progress-indicator-label" class="dso-progress-indicator-label">
          {label}
        </span>
      </Host>
    );
  }
}
