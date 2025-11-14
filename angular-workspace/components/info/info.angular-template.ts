import { Info } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { AngularStoryReturn } from "../helpers";

export const angularInfo: ComponentImplementation<Info<AngularStoryReturn>> = {
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
