import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";
import { Annotation } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularAnnotation: ComponentImplementation<Annotation<StoryFnAngularReturnType>> = {
  component: "annotation",
  implementation: "angular",
  template: () =>
    function annotation(props) {
      return {
        props,
        template: `
          <dso-annotation-button [identifier]="annotationButton.identifier"></dso-annotation-button>
          <dso-annotation-output
            [slot]="annotationOutput.slotName"
            [attr.identifier]="annotationOutput.identifier"
            (dsoToggleAnnotation)="annotationOutput.dsoToggleAnnotation?.($event)"
          >
            ${props.annotationOutput.title.template}
            ${props.annotationOutput.addons?.template ?? ""}
            ${props.annotationOutput.content.template}
          </dso-annotation-output>
        `,
      };
    },
};
