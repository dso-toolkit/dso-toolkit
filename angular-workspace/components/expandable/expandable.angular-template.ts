import type { IStory } from "@storybook/angular";
import { Expandable } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularExpandable: ComponentImplementation<Expandable<IStory>> = {
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
