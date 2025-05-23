import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";
import { Info } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularInfo: ComponentImplementation<Info<StoryFnAngularReturnType>> = {
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
