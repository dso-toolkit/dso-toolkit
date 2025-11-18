import { Toggletip } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { AngularTemplateResult } from "../angular-story-types";

export const angularToggletip: ComponentImplementation<Toggletip<AngularTemplateResult>> = {
  component: "toggletip",
  implementation: "angular",
  template: () =>
    function toggletipTemplate(props) {
      return {
        props,
        template: `
          <dso-toggletip
            [label]="label"
            [position]="position"
            [small]="small"
            [innerHTML]="children.template"
          ></dso-toggletip>
        `,
      };
    },
};
