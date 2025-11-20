import type { IStory } from "@storybook/angular";
import { Info } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularInfo: ComponentImplementation<Info<IStory>> = {
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
