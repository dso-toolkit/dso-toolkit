import { AnnotationButton } from "dso-toolkit";
import * as React from "react";

import { DsoAnnotationButton } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactAnnotationButton: ComponentImplementation<AnnotationButton> = {
  component: "annotationButton",
  implementation: "react",
  template: () =>
    function annotationButtonTemplate({ identifier, slotName }) {
      const slotProp = slotName && { slot: slotName };

      return <DsoAnnotationButton identifier={identifier} {...slotProp}></DsoAnnotationButton>;
    },
};
