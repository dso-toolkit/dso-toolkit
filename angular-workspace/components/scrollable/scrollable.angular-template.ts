import { Scrollable } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { AngularStoryReturn } from "../helpers";

export const angularScrollable: ComponentImplementation<Scrollable<AngularStoryReturn>> = {
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
