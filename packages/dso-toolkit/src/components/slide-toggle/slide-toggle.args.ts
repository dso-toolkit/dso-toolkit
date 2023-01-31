import { ArgTypes, noControl } from "../../storybook/index.js";
import { SlideToggle } from "./slide-toggle.models.js";
import { HandlerFunction } from "@storybook/addon-actions";

export interface SlideToggleArgs {
  checked: boolean;
  disabled: boolean;
  accessibleLabel: string;
  labelledbyId: string;
  label: string;
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
  accessibleLabel: {
    control: {
      type: "text",
    },
  },
  labelledbyId: {
    control: {
      type: "text",
    },
  },
  // Re-enable when label will officially be part of the component.
  label: {
    ...noControl,
  },
  dsoActiveChange: {
    ...noControl,
    action: "dsoActiveChange",
  },
};

export function slideToggleArgsMapper(a: SlideToggleArgs): SlideToggle {
  return {
    ...a,
  };
}

export function slideToggleDefaultArgs(a: Partial<SlideToggle>): Partial<SlideToggle> {
  return a;
}
