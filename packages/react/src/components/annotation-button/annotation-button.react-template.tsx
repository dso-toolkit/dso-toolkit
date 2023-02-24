import { AnnotationButton } from "dso-toolkit";
import * as React from "react";

import { DsoAnnotationButton } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactAnnotationButton: ComponentImplementation<AnnotationButton> = {
  component: "annotationButton",
  implementation: "react",
  template: () =>
    function annotationButtonTemplate({ identifier, slotName }) {
      const props = {
        ...(slotName && { slot: slotName }),
        identifier,
      };

      return <DsoAnnotationButton {...props}></DsoAnnotationButton>;
    },
};
