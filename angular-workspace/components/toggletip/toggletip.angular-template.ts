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
            [variant]="variant"
            [label]="label"
            [placement]="placement"
            [status]="status"
            [message]="message"
            [innerHTML]="children.template"
          ></dso-toggletip>
        `,
      };
    },
};
