import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { DatePickerLegacy } from "./date-picker-legacy.models.js";

export interface DatePickerLegacyArgs {
  id: string;
  label: string;
  dsoDateChange: HandlerFunction;
  direction: "left" | "right";
  value: string;
  min: string;
  max: string;
  disabled: boolean;
  autofocus: boolean;
  invalid: boolean;
  describedBy: string;
}

export const datePickerLegacyArgTypes: ArgTypes<DatePickerLegacyArgs> = {
  id: {
    control: {
      type: "text",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  disabled: {
    control: {
      type: "boolean",
    },
  },
  direction: {
    options: [undefined, "left", "right"],
    control: {
      type: "select",
      labels: {
        undefined: "default",
        left: "left",
        right: "right",
      },
    },
  },
  value: {
    control: {
      type: "text",
    },
  },
  min: {
    control: {
      type: "text",
    },
  },
  max: {
    control: {
      type: "text",
    },
  },
  autofocus: {
    control: {
      type: "boolean",
    },
  },
  invalid: {
    type: "boolean",
  },
  describedBy: {
    control: {
      type: "text",
    },
  },
  dsoDateChange: {
    action: "dsoDateChange",
  },
};

export function datePickerLegacyArgsMapper(a: DatePickerLegacyArgs): Required<DatePickerLegacy> {
  return {
    ...a,
    dsoDateChange: (e) => a.dsoDateChange(e.detail),
  };
}
