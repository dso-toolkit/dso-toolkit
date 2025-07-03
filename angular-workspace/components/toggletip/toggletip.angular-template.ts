import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";
import { Toggletip } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularToggletip: ComponentImplementation<Toggletip<StoryFnAngularReturnType>> = {
  component: "toggletip",
  implementation: "angular",
  template: () =>
    function toggletipTemplate(props) {
      return {
        props,
        template: `
          <dso-toggletip
            [mode]="mode"
            [badgeStatus]="badgeStatus"
            [icon]="icon"
            [iconActive]="iconActive"
            [label]="label"
            [position]="position"
            [small]="small"
            [innerHTML]="children.template"
          ></dso-toggletip>
        `,
      };
    },
};
