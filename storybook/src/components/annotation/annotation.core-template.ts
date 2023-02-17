import { Annotation } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

import { ComponentImplementation, Templates } from "../../templates";

export const coreAnnotation: ComponentImplementation<Annotation<TemplateResult>> = {
  component: "annotation",
  implementation: "core",
  template: ({ annotationButtonTemplate, annotationOutputTemplate }: Templates) =>
    function annotation({ annotationButton, annotationOutput }: Annotation<TemplateResult>) {
      return html` ${annotationButtonTemplate(annotationButton)} ${annotationOutputTemplate(annotationOutput)} `;
    },
};
