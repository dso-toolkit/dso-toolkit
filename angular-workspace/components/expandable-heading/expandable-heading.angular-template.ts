import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";
import { ExpandableHeading } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularExpandableHeading: ComponentImplementation<ExpandableHeading<StoryFnAngularReturnType>> = {
  component: "expandableHeading",
  implementation: "angular",
  template: () =>
    function expandableHeadingTemplate(props) {
      return {
        props,
        template: `
          <dso-expandable-heading
            [color]="color"
            [editAction]="editAction"
            [heading]="heading"
            [suppressed]="suppressed"
            (dsoToggle)="dsoToggle?.($event)"
          >
            ${props.title.template}
            ${props.addonsStart ? props.addonsStart.template : ""}
            ${props.addonsEnd ? props.addonsEnd.template : ""}
            ${props.content.template}
          </dso-expandable-heading>
        `,
      };
    },
};
