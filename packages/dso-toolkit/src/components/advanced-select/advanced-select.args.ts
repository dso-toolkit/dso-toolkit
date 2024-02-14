import { ArgTypes } from "@storybook/types";

import {
  AdvancedSelect,
  AdvancedSelectGroup,
  AdvancedSelectOption,
  AdvancedSelectOptionOrGroup,
} from "./advanced-select.models.js";
import { noControl } from "../../storybook";
import { HandlerFunction } from "@storybook/addon-actions";

export interface AdvancedSelectArgs {
  activeIndex?: number;
  activeHint?: string;
  dsoOptionClick: HandlerFunction;
  dsoRedirectClick: HandlerFunction;
}

export const advancedSelectArgTypes: ArgTypes<AdvancedSelectArgs> = {
  activeIndex: {
    name: "Active option",
    control: {
      type: "number",
    },
  },
  activeHint: {
    name: "Active hint",
    control: {
      type: "text",
    },
  },
  dsoOptionClick: {
    ...noControl,
    action: "dsoOptionClick",
  },
  dsoRedirectClick: {
    ...noControl,
    action: "dsoRedirectClick",
  },
};

export function advancedSelectArgsMapper(
  a: AdvancedSelectArgs,
  options: AdvancedSelectOptionOrGroup<unknown>[],
): AdvancedSelect<unknown> {
  return {
    options,
    active: selectExampleOption(a.activeIndex, options),
    activeHint: a.activeHint,
    dsoOptionClick: (e) => a.dsoOptionClick(e.detail),
    dsoRedirectClick: (e) => {
      e.detail.originalEvent.preventDefault();
      a.dsoRedirectClick(e.detail);
    },
  };
}

function selectExampleOption(
  index: number = 0,
  options: AdvancedSelectOptionOrGroup<unknown>[],
): AdvancedSelectOption<unknown> | undefined {
  switch (index) {
    case 0:
      return (options[0] as AdvancedSelectGroup<unknown>).options[index];
    case 1:
    case 2:
      return (options[1] as AdvancedSelectGroup<unknown>).options[index - 1];
    case 3:
    case 4:
    case 5:
      return (options[2] as AdvancedSelectGroup<unknown>).options[index - 3];
    default:
      return undefined;
  }
}
