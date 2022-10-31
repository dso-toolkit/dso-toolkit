import { ArgTypes } from "../../storybook";
import { content } from "./content/form.content";

import { Form } from "./form.models";

export interface FormArgs {
  legend?: string;
  legendHeading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | undefined;
  mode: "horizontal" | "vertical" | undefined;
}

export const formArgTypes: ArgTypes<FormArgs> = {
  legend: {
    defaultValue: "Formulier",
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
    legend: a.legend,
    legendHeading: a.legendHeading,
    mode: a.mode,
    formGroups: content,
  };
}
