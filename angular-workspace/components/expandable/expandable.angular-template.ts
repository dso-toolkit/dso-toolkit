import { Expandable } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { AngularStoryReturn } from "../helpers";

export const angularExpandable: ComponentImplementation<Expandable<AngularStoryReturn>> = {
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
