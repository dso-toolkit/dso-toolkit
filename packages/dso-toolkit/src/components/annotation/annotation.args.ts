import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../storybook/index.js";
import { Annotation } from "./annotation.models.js";

export interface AnnotationArgs {
  identifier: string;
  prefix: string;
  dsoToggle: HandlerFunction;
}

export const annotationArgTypes: ArgTypes<AnnotationArgs> = {
  identifier: {
    ...noControl,
  },
  prefix: {
    type: "string",
  },
  dsoToggle: {
    ...noControl,
    action: "dsoToggle",
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
      prefix: a.prefix,
      title: annotationContent.title,
      addons: annotationContent.addons,
      content: annotationContent.content,
      dsoToggle: (e) => a.dsoToggle(e.detail),
    },
  };
}
