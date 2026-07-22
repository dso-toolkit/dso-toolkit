import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { options } from "./advanced-select.content";
import {
  AdvancedSelect,
  AdvancedSelectGroup,
  AdvancedSelectOption,
  AdvancedSelectPlaceholder,
} from "./advanced-select.models.js";

export interface AdvancedSelectArgs {
  activeIndex?: number;
  activeHint?: string;
  optionsOrGroup: (AdvancedSelectOption<unknown> | AdvancedSelectGroup<unknown> | AdvancedSelectPlaceholder)[];
  dsoChange: HandlerFunction;
  dsoRedirect: HandlerFunction;
}

export const advancedSelectArgs: AdvancedSelectArgs = {
  activeHint: "Deze bekijkt u nu",
  optionsOrGroup: options,
  dsoChange: fn(),
  dsoRedirect: fn(),
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
  optionsOrGroup: {
    control: {
      type: "object",
    },
  },
  dsoChange: argTypeAction(),
  dsoRedirect: argTypeAction(),
};

export function advancedSelectArgsMapper(a: AdvancedSelectArgs): AdvancedSelect<unknown> {
  return {
    options: a.optionsOrGroup,
    active: selectExampleOption(a.activeIndex, a.optionsOrGroup),
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

export function selectExampleOption(
  index: number = 0,
  options: (AdvancedSelectOption<unknown> | AdvancedSelectGroup<unknown> | AdvancedSelectPlaceholder)[],
) {
  return options.flatMap((optionOrGroup) => ("options" in optionOrGroup ? optionOrGroup.options : optionOrGroup))[
    index
  ];
}
