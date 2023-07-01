import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";
import { Scrollable } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularScrollable: ComponentImplementation<Scrollable<StoryFnAngularReturnType>> = {
  component: "scrollable",
  implementation: "angular",
  template: () =>
    function scrollableTemplate(props) {
      return {
        props,
        template: `
          <dso-scrollable
            (dsoScrollEnd)="dsoScrollEnd?.($event)"
          >
            ${props.children.template}
          </dso-scrollable>
        `,
      };
    },
};
