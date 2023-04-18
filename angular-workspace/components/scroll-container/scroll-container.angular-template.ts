import { ScrollContainer } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

export const angularScrollContainer: ComponentImplementation<ScrollContainer<StoryFnAngularReturnType>> = {
  component: "scrollContainer",
  implementation: "angular",
  template: () =>
    function scrollContainerTemplate(props) {
      return {
        props,
        template: `
          <dso-scroll-container
            (dsoScrollContainerEvent)="dsoScrollContainerEvent()"
          >
            ${props.children.template}
          </dso-scroll-container>
        `,
      };
    },
};
