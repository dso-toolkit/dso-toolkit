import { ProgressBar } from "@dso-toolkit/sources";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreProgressBar: ComponentImplementation<ProgressBar> = {
  component: "progressBar",
  implementation: "core",
  template: () =>
    function progressBarTemplate({ progress, label, min, max }) {
      return html`
        <dso-progress-bar progress=${progress} min=${ifDefined(min)} max=${ifDefined(max)}
          >${label ?? nothing}</dso-progress-bar
        >
      `;
    },
};
