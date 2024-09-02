import { ArgTypes } from "@storybook/types";

import { buttons } from "./content/form.content.js";
import { Form, FormAsteriskExplanationPosition, FormContent } from "./models/form.model.js";

export interface FormArgs {
  asteriskExplanation?: FormAsteriskExplanationPosition;
  mode: "horizontal" | "vertical" | undefined;
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
    formButtons: buttons,
  };
}
