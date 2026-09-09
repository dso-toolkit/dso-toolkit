import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { options } from "./advanced-select.content.js";
import {
  AdvancedSelect,
  AdvancedSelectGroup,
  AdvancedSelectOption,
  AdvancedSelectPlaceholder,
} from "./advanced-select.models.js";

export interface AdvancedSelectArgs {
  activeIndex?: number;
  activeHint?: string;
  optionsOrGroup: (
    AdvancedSelectOption<TemplateResult> | AdvancedSelectGroup<TemplateResult> | AdvancedSelectPlaceholder
  )[];
  dsoChange: HandlerFunction;
  dsoRedirect: HandlerFunction;
}

export const advancedSelectArgs: AdvancedSelectArgs = {
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

export function advancedSelectArgsMapper(a: AdvancedSelectArgs): AdvancedSelect<TemplateResult> {
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

export function selectExampleOption<TemplateFnReturnType>(
  index: number = 0,
  options: (
    AdvancedSelectOption<TemplateFnReturnType> | AdvancedSelectGroup<TemplateFnReturnType> | AdvancedSelectPlaceholder
  )[],
): AdvancedSelectOption<TemplateFnReturnType> | undefined {
  return options.flatMap((optionOrGroup) =>
    "options" in optionOrGroup ? optionOrGroup.options : "placeholder" in optionOrGroup ? [] : optionOrGroup,
  )[index];
}
