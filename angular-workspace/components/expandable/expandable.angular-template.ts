import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";
import { Expandable } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularExpandable: ComponentImplementation<Expandable<StoryFnAngularReturnType>> = {
  component: "expandable",
  implementation: "angular",
  template: () =>
    function expandableTemplate(props) {
      return {
        props,
        template: `
          <dso-expandable
            [enableAnimation]="enableAnimation"
            [minimumHeight]="minimumHeight"
            [open]="open"
          >
            ${props.content.template}
          </dso-expandable>
        `,
      };
    },
};
