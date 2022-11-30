import { ProgressIndicator } from "../../../sources";
import { ComponentImplementation } from "../../templates";
import { ProgressIndicatorVariables } from "./progress-indicator.models";

export const angularProgressIndicator: ComponentImplementation<ProgressIndicator> = {
  component: "progressIndicator",
  implementation: "angular",
  template: () =>
    function progressIndicatorTemplate(props) {
      return {
        props,
        template: `
          <dso-progress-indicator
            [label]="label"
            [block]="block"
            [size]="size"
          ></dso-progress-indicator>
        `,
      };
    },
};

export function progressIndicatorHtml(variables: ProgressIndicatorVariables) {
  return `
    <dso-progress-indicator
      [label]="${variables.label}"
      ${variables.block ? `[block]="${variables.block}"` : ""}
      ${variables.size ? `[size]="${variables.size}"` : ""}
    ></dso-progress-indicator>
  `;
}
