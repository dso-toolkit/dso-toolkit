import { ArgTypes } from "@storybook/types";

import { AdvancedSelect, AdvancedSelectOptionsOrGroup } from "./advanced-select.models.js";

export interface AdvancedSelectArgs {
  activeIndex?: number;
  open: boolean;
}

export const advancedSelectArgs: AdvancedSelectArgs = {
  activeIndex: undefined,
  open: false,
};

export const advancedSelectArgTypes: ArgTypes<AdvancedSelectArgs> = {
  activeIndex: {
    control: {
      type: "number",
    },
  },
  open: {
    control: {
      type: "boolean",
    }
  }
};

export function advancedSelectArgsMapper(
  a: AdvancedSelectArgs,
  options: AdvancedSelectOptionsOrGroup<unknown>[],
): AdvancedSelect<unknown> {
  return {
    options,
    active: a.activeIndex ? options[a.activeIndex] : undefined,
    open: a.open,
  };
}
