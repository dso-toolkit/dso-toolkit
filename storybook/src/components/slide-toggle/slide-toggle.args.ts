import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { SlideToggle } from "./slide-toggle.models.js";

export interface SlideToggleArgs {
  checked: boolean;
  disabled: boolean;
  accessibleLabel: string;
  labelledbyId: string;
  label: string;
  useOwnLabelId: string;
  dsoActiveChange: HandlerFunction;
}

export const slideToggleArgTypes: ArgTypes<SlideToggleArgs> = {
  checked: {
    control: {
      type: "boolean",
    },
  },
  disabled: {
    control: {
      type: "boolean",
    },
  },
  accessibleLabel: argTypeAction(),
  labelledbyId: argTypeAction(),
  useOwnLabelId: argTypeAction(),
  // Re-enable when label will officially be part of the component.
  label: argTypeAction(),
  dsoActiveChange: argTypeAction(),
};

export function slideToggleArgsMapper(a: SlideToggleArgs): SlideToggle {
  return {
    ...a,
    dsoActiveChange: (e) => a.dsoActiveChange(e.detail),
  };
}

export function slideToggleDefaultArgs(a: Partial<SlideToggle>): Partial<SlideToggle> {
  return a;
}
