import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";
import { AnnotationOutput } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

const defaultPropValues = {
  identifier: "id",
};

export const angularAnnotationOutput: ComponentImplementation<AnnotationOutput<StoryFnAngularReturnType>> = {
  component: "annotationOutput",
  implementation: "angular",
  template: () =>
    function annotationOutputTemplate(props, propValues) {
      const { identifier } = {
        ...defaultPropValues,
        ...propValues,
      };

      return {
        props,
        template: `
        <dso-annotation-output
          [slot]="slotName"
          [attr.identifier]="${identifier}"
          (dsoToggleAnnotation)="dsoToggleAnnotation()"
        >
          {{title}} {{addons ? addons : ""}} {{content}}</dso-annotation-output
        >`,
      };
    },
};
