import { Scrollable } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { AngularTemplateResult } from "../angular-story-types";

export const angularScrollable: ComponentImplementation<Scrollable<AngularTemplateResult>> = {
  component: "scrollable",
  implementation: "angular",
  template: () =>
    function scrollableTemplate(props) {
      return {
        props,
        template: `
          <dso-scrollable
            (dsoScrollEnd)="dsoScrollEnd?.($event)"
          >
            ${props.children.template}
          </dso-scrollable>
        `,
      };
    },
};
