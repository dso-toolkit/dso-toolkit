import { AnnotationOutput } from "dso-toolkit";
import * as React from "react";

import { DsoAnnotationOutput } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactAnnotationOutput: ComponentImplementation<AnnotationOutput<JSX.Element>> = {
  component: "annotationOutput",
  implementation: "react",
  template: () =>
    function annotationOutputTemplate({ identifier, slotName, content, title, addons, prefix, dsoToggle }) {
      const slotProp = slotName && { slot: slotName };

      return (
        <DsoAnnotationOutput identifier={identifier} annotationPrefix={prefix} onDsoToggle={dsoToggle} {...slotProp}>
          {title}
          {addons && addons}
          {content}
        </DsoAnnotationOutput>
      );
    },
};
