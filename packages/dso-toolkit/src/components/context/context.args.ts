import { ArgTypes } from "@storybook/types";

import { Context } from "./context.models.js";

export interface ContextArgs {
  type: "legend" | "label";
  alignLeft: boolean;
}

export const contextArgTypes: ArgTypes<ContextArgs> = {
  type: {
    options: ["legend", "label"],
    control: {
      type: "select",
    },
  },
  alignLeft: {
    control: {
      type: "boolean",
    },
  },
};

export function contextArgsMapper<TemplateFnReturnType>(
  a: ContextArgs,
  content: TemplateFnReturnType,
  children: TemplateFnReturnType,
  label: TemplateFnReturnType,
): Context<TemplateFnReturnType> {
  return {
    content,
    children,
    label,
    type: a.type,
    alignLeft: a.alignLeft,
  };
}
