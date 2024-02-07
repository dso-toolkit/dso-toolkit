import { ArgTypes } from "@storybook/types";

import { content, buttons } from "./content/form.content.js";
import { Form, FormAsteriskExplanationPosition } from "./models/form.model.js";

export interface FormArgs {
  asteriskExplanation?: FormAsteriskExplanationPosition;
  legend?: string;
  legendHeading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | undefined;
  mode: "horizontal" | "vertical" | undefined;
}

export const formArgTypes: ArgTypes<FormArgs> = {
  asteriskExplanation: {
    options: [undefined, "top", "bottom", "both"],
    control: {
      type: "select",
    },
  },
  legend: {
    control: {
      type: "text",
    },
  },
  legendHeading: {
    options: [undefined, "h1", "h2", "h3", "h4", "h5", "h6"],
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
    legend: a.legend,
    legendHeading: a.legendHeading,
    mode: a.mode,
    formGroups: content,
    formButtons: buttons,
  };
}
