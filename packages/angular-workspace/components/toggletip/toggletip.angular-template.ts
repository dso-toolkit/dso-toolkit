import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { Toggletip } from "../../../sources";
import { ComponentImplementation } from "../../templates";

export const angularToggletip: ComponentImplementation<Toggletip<StoryFnAngularReturnType>> = {
  component: "toggletip",
  implementation: "angular",
  template: () =>
    function toggleTipTemplate(props) {
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
