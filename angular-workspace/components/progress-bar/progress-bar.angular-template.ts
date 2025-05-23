import { ProgressBar } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularProgressBar: ComponentImplementation<ProgressBar> = {
  component: "progressBar",
  implementation: "angular",
  template: () =>
    function progressBarTemplate(props) {
      return {
        props,
        template: `
          <dso-progress-bar
            [progress]="progress"
            [min]="min"
            [max]="max"
          >
            {{ label }}
          </dso-progress-bar>
        `,
      };
    },
};
