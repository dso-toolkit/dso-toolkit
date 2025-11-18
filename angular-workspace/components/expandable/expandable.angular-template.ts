import { Expandable } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { AngularTemplateResult } from "../angular-story-types";

export const angularExpandable: ComponentImplementation<Expandable<AngularTemplateResult>> = {
  component: "expandable",
  implementation: "angular",
  template: () =>
    function expandableTemplate(props) {
      return {
        props,
        template: `
          <dso-expandable
            [enableAnimation]="enableAnimation"
            [minimumHeight]="minimumHeight"
            [open]="open"
          >
            ${props.content.template}
          </dso-expandable>
        `,
      };
    },
};
