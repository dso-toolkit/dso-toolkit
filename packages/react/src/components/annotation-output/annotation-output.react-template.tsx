import { AnnotationOutput } from "dso-toolkit";
import * as React from "react";

import { DsoAnnotationOutput } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactAnnotationOutput: ComponentImplementation<AnnotationOutput<JSX.Element>> = {
  component: "annotationOutput",
  implementation: "react",
  template: () =>
    function annotationOutputTemplate({ identifier, slotName, content, title, addons, dsoToggleAnnotation }) {
      return (
        <DsoAnnotationOutput slot={slotName} identifier={identifier} onDsoToggleAnnotation={dsoToggleAnnotation}>
          {title}
          {addons && addons}
          {content}
        </DsoAnnotationOutput>
      );
    },
};
