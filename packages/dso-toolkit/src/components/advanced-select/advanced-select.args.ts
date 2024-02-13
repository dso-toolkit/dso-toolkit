import { ArgTypes } from "@storybook/types";

import { AdvancedSelect, AdvancedSelectOptionsOrGroup } from "./advanced-select.models.js";

export interface AdvancedSelectArgs {
  activeIndex?: number;
}

export const advancedSelectArgs: AdvancedSelectArgs = {
  activeIndex: undefined,
};

export const advancedSelectArgTypes: ArgTypes<AdvancedSelectArgs> = {
  activeIndex: {
    control: {
      type: "number",
    },
  },
};

export function advancedSelectArgsMapper(
  a: AdvancedSelectArgs,
  options: AdvancedSelectOptionsOrGroup[],
): AdvancedSelect {
  return {
    options,
    active: a.activeIndex ? options[a.activeIndex] : undefined,
  };
}
