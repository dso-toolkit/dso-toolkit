import { Annotation } from "dso-toolkit";
import * as React from "react";

import { ComponentImplementation, Templates } from "../../templates";

export const reactAnnotation: ComponentImplementation<Annotation<JSX.Element>> = {
  component: "annotation",
  implementation: "react",
  template: ({ annotationButtonTemplate, annotationOutputTemplate }: Templates) =>
    function annotation({ annotationButton, annotationOutput }: Annotation<JSX.Element>) {
      return (
        <>
          {annotationButtonTemplate(annotationButton)}
          {annotationOutputTemplate(annotationOutput)}
        </>
      );
    },
};
