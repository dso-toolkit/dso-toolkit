import { Info } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { AngularTemplateResult } from "../angular-story-types";

export const angularInfo: ComponentImplementation<Info<AngularTemplateResult>> = {
  component: "info",
  implementation: "angular",
  template: () =>
    function infoTemplate(props) {
      return {
        props,
        template: `
          <dso-info
            [fixed]="fixed"
            [active]="active"
            (dsoClose)="dsoClose()"
          >
            <div [outerHTML]="content.template"></div>
          </dso-info>
        `,
      };
    },
};
