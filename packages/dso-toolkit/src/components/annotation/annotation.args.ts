import { ArgTypes } from "@storybook/types";
import { HandlerFunction } from "@storybook/addon-actions";

import { noControl } from "../../storybook/index.js";

import { Annotation } from "./annotation.models.js";

export interface AnnotationArgs {
  identifier: string;
  open: boolean;
  prefix: string;
  dsoClose: HandlerFunction;
  dsoClick: HandlerFunction;
}

export const annotationArgs: Pick<AnnotationArgs, "open" | "identifier"> = {
  open: true,
  identifier: "annotation-test",
};

export const annotationArgTypes: ArgTypes<AnnotationArgs> = {
  identifier: {
    ...noControl,
  },
  open: {
    type: "boolean",
  },
  prefix: {
    type: "string",
  },
  dsoClick: {
    ...noControl,
    action: "dsoClick",
  },
  dsoClose: {
    ...noControl,
    action: "dsoClose",
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
      open: a.open,
      dsoClick: (e) => a.dsoClick(e.detail),
    },
    annotationOutput: {
      identifier: a.identifier,
      open: a.open,
      prefix: a.prefix,
      title: annotationContent.title,
      addons: annotationContent.addons,
      content: annotationContent.content,
      dsoClose: (e) => a.dsoClose(e.detail),
    },
  };
}
