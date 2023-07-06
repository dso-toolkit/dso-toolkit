import { AnnotationOutput } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreAnnotationOutput: ComponentImplementation<AnnotationOutput<TemplateResult>> = {
  component: "annotationOutput",
  implementation: "core",
  template: () =>
    function annotationOutputTemplate({
      identifier,
      open,
      slotName,
      content,
      title,
      addons,
      prefix,
      dsoClose,
    }: AnnotationOutput<TemplateResult>) {
      return html`<dso-annotation-output
        slot=${ifDefined(slotName)}
        ?open=${open}
        identifier=${identifier}
        annotation-prefix=${ifDefined(prefix)}
        @dsoClose=${ifDefined(dsoClose)}
      >
        ${title} ${addons ? addons : ""} ${content}
      </dso-annotation-output>`;
    },
};
