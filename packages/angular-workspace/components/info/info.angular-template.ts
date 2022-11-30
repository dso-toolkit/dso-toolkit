import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { Info } from "../../../sources";
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
