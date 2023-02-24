import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";
import { AnnotationOutput } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

const defaultPropValues = {
  identifier: "id",
  slotName: "slotName",
  dsoToggleAnnotation: "dsoToggleAnnotation?.($event)",
};

export const angularAnnotationOutput: ComponentImplementation<AnnotationOutput<StoryFnAngularReturnType>> = {
  component: "annotationOutput",
  implementation: "angular",
  template: () =>
    function annotationOutputTemplate(props, propValues) {
      const { identifier, slotName, dsoToggleAnnotation } = {
        ...defaultPropValues,
        ...propValues,
      };

      return {
        props,
        template: `
          <dso-annotation-output
            ${props.slotName ? `[slot]="${slotName}"` : ""}
            [attr.identifier]="${identifier}"
            (dsoToggleAnnotation)="${dsoToggleAnnotation}"
          >
            ${props.title.template}
            ${props.addons ? props.addons.template : ""}
            ${props.content.template}
          </dso-annotation-output>
        `,
      };
    },
};
