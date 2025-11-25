import type { IStory } from "@storybook/angular";
import { Toggletip } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularToggletip: ComponentImplementation<Toggletip<IStory>> = {
  component: "toggletip",
  implementation: "angular",
  template: () =>
    function toggletipTemplate(props) {
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
