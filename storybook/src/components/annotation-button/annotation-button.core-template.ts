import { AnnotationButton } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreAnnotationButton: ComponentImplementation<AnnotationButton> = {
  component: "annotationButton",
  implementation: "core",
  template: () =>
    function annotationButtonTemplate({ identifier, open, slotName, dsoClick }) {
      return html`<dso-annotation-button
        slot=${ifDefined(slotName)}
        ?open=${open}
        identifier=${identifier}
        @dsoClick=${ifDefined(dsoClick)}
      ></dso-annotation-button>`;
    },
};
