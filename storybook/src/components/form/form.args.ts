import { ArgTypes } from "storybook/internal/types";

import { buttons } from "./form.content.js";
import { Form, FormAsteriskExplanationPosition, FormContent } from "./form.models.js";

export interface FormArgs {
  asteriskExplanation?: FormAsteriskExplanationPosition;
  mode: "horizontal" | "vertical" | undefined;
  formModifier?: string;
}

export const formArgTypes: ArgTypes<FormArgs> = {
  asteriskExplanation: {
    options: [undefined, "top", "bottom", "both"],
    control: {
      type: "select",
    },
  },
  mode: {
    options: [undefined, "horizontal", "vertical"],
    control: {
      type: "select",
    },
  },
};

export function formArgsMapper<TemplateFnReturnType>(
  a: FormArgs,
  content: FormContent<TemplateFnReturnType>,
): Form<TemplateFnReturnType> {
  return {
    asteriskExplanation: a.asteriskExplanation,
    mode: a.mode,
    content,
    formModifier: a.formModifier,
    formButtons: buttons,
  };
}
