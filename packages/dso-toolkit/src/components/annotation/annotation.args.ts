import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../storybook/index.js";
import { Annotation } from "./annotation.models.js";

export interface AnnotationArgs {
  identifier: string;
  dsoToggleAnnotation: HandlerFunction;
}

export const annotationArgTypes: ArgTypes<AnnotationArgs> = {
  identifier: {
    ...noControl,
  },
  dsoToggleAnnotation: {
    ...noControl,
    action: "dsoToggleAnnotation",
  },
};

export function annotationArgsMapper<TemplateFnReturnType>(
  a: AnnotationArgs,
  annotationContent: {
    title: TemplateFnReturnType;
    addons?: TemplateFnReturnType;
    content: TemplateFnReturnType;
  }
): Annotation<TemplateFnReturnType> {
  return {
    annotationButton: {
      identifier: a.identifier,
    },
    annotationOutput: {
      identifier: a.identifier,
      title: annotationContent.title,
      addons: annotationContent.addons,
      content: annotationContent.content,
      dsoToggleAnnotation: (e) => a.dsoToggleAnnotation(e.detail),
    },
  };
}
