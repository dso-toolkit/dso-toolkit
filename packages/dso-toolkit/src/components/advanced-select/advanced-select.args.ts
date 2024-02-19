import { ArgTypes } from "@storybook/types";

import {
  AdvancedSelect,
  AdvancedSelectGroup,
  AdvancedSelectOption,
  AdvancedSelectOptionsOrGroup,
} from "./advanced-select.models.js";
import { noControl } from "../../storybook";
import { HandlerFunction } from "@storybook/addon-actions";

export interface AdvancedSelectArgs {
  activeIndex?: number;
  open: boolean;
  dsoClick: HandlerFunction;
  dsoOptionClick: HandlerFunction;
}

export const advancedSelectArgs: Pick<AdvancedSelectArgs, "activeIndex" | "open"> = {
  activeIndex: undefined,
  open: false,
};

export const advancedSelectArgTypes: ArgTypes<AdvancedSelectArgs> = {
  activeIndex: {
    name: "Active option",
    control: {
      type: "number",
    },
  },
  open: {
    name: "Open",
    control: {
      type: "boolean",
    },
  },
  dsoClick: {
    ...noControl,
    action: "dsoClick",
  },
  dsoOptionClick: {
    ...noControl,
    action: "dsoOptionClick",
  },
};

export function advancedSelectArgsMapper(
  a: AdvancedSelectArgs,
  options: AdvancedSelectOptionsOrGroup<unknown>[],
): AdvancedSelect<unknown> {
  return {
    options,
    active: selectExampleOption(a.activeIndex, options),
    open: a.open,
    dsoClick: (e) => a.dsoClick(e.detail),
    dsoOptionClick: (e) => a.dsoOptionClick(e.detail),
  };
}

function selectExampleOption(
  index: number = 0,
  options: AdvancedSelectOptionsOrGroup<unknown>[],
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
