import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";
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
            [animationOffset]="animationOffset"
            [open]="open"
            (dsoToggle)="dsoToggle()"
          >
            ${props.content.template}
          </dso-expandable>
        `,
      };
    },
};