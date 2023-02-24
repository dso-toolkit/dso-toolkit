import { AnnotationOutput } from "dso-toolkit";
import * as React from "react";

import { DsoAnnotationOutput } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactAnnotationOutput: ComponentImplementation<AnnotationOutput<JSX.Element>> = {
  component: "annotationOutput",
  implementation: "react",
  template: () =>
    function annotationOutputTemplate({ identifier, slotName, content, title, addons, prefix, dsoToggleAnnotation }) {
      const props = {
        identifier,
        annotationPrefix: prefix,
        onDsoToggleAnnotation: dsoToggleAnnotation,
        ...(slotName && { slot: slotName }),
      };

      return (
        <DsoAnnotationOutput {...props}>
          {title}
          {addons && addons}
          {content}
        </DsoAnnotationOutput>
      );
    },
};
