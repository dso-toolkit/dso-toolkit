import { AnnotationButton } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

const defaultPropValues = {
  slotName: "slotName",
  identifier: "id",
};

export const angularAnnotationButton: ComponentImplementation<AnnotationButton> = {
  component: "annotationButton",
  implementation: "angular",
  template: () =>
    function annotationButtonTemplate(props, propValues) {
      const { slotName, identifier } = {
        ...defaultPropValues,
        ...propValues,
      };

      return {
        props,
        template: `
        <dso-annotation-button
          ${props.slotName ? `[slot]="${slotName}"` : ""}
          [identifier]="${identifier}"
        ></dso-annotation-button>`,
      };
    },
};
