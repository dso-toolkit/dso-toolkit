import { ArgTypes } from "@storybook/types";

import { content, buttons } from "./content/form.content.js";
import { Form, FormAsteriskExplanationPosition } from "./models/form.model.js";

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

export function formArgsMapper<TemplateFnReturnType>(a: FormArgs): Form<TemplateFnReturnType> {
  return {
    asteriskExplanation: a.asteriskExplanation,
    mode: a.mode,
    content,
    formButtons: buttons,
  };
}
