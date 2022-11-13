import { ProgressBar } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssProgressBar: ComponentImplementation<ProgressBar> = {
  component: "progressBar",
  implementation: "css",
  template: () =>
    function progressBarTemplate({ progress, label, min, max }) {
      return html`
        <div class="progress">
          <span
            class="progress-bar"
            role="progressbar"
            aria-labelledby="progress-bar-label"
            aria-valuenow=${Math.round(progress)}
            aria-valuemin=${min || 0}
            aria-valuemax=${max || 100}
          >
            <span style="width: ${Math.round((progress / (max || 100)) * 100)}%"></span>
          </span>
          <span id="progress-bar-label">${label}</span>
        </div>
      `;
    },
};
