import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

import { AdvancedSelect, AdvancedSelectOptionOrGroup } from "./advanced-select.models.js";

export interface AdvancedSelectArgs {
  activeIndex?: number;
  activeHint?: string;
  dsoChange: HandlerFunction;
  dsoRedirect: HandlerFunction;
}

export const advancedSelectArgs: Omit<AdvancedSelectArgs, "dsoChange" | "dsoRedirect"> = {
  activeHint: "Deze bekijkt u nu",
};

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
  dsoChange: {
    ...noControl,
  },
  dsoRedirect: {
    ...noControl,
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
    dsoChange: (e) => a.dsoChange(e.detail),
    dsoRedirect: (e) => {
      if (!e.detail.isModifiedEvent) {
        e.detail.originalEvent.preventDefault();
        a.dsoRedirect(e.detail);
      }
    },
  };
}

export function selectExampleOption(index: number = 0, options: AdvancedSelectOptionOrGroup<unknown>[]) {
  return options.flatMap((optionOrGroup) => ("options" in optionOrGroup ? optionOrGroup.options : optionOrGroup))[
    index
  ];
}
