import { AnnotationOutput } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreAnnotationOutput: ComponentImplementation<AnnotationOutput<TemplateResult>> = {
  component: "annotationOutput",
  implementation: "core",
  template: () =>
    function annotationOutputTemplate({ identifier, slotName, content, title, addons }) {
      return html`<dso-annotation-output slot=${ifDefined(slotName)} identifier=${identifier}>
        ${title} ${addons ? addons : ""} ${content}</dso-annotation-output
      >`;
    },
};
