import { ArgTypes } from "storybook/internal/types";

import { LegendGroup } from "./legend-group.models.js";

export interface LegendGroupArgs {
  mode: "edit" | "view";
}

export const legendGroupArgs: LegendGroupArgs = {
  mode: "view",
};

export const legendGroupArgTypes: ArgTypes<LegendGroupArgs> = {
  mode: {
    control: { type: "select" },
    options: ["edit", "view"],
  },
};

export function legendGroupArgsMapper<TemplateFnReturnType>(
  a: LegendGroupArgs,
  heading?: TemplateFnReturnType,
  children?: TemplateFnReturnType,
): LegendGroup<TemplateFnReturnType> {
  return {
    ...a,
    heading,
    children,
  };
}
