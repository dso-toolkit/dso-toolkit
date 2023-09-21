import { ArgTypes } from "@storybook/types";
import { HandlerFunction } from "@storybook/addon-actions";
import { DatePicker } from "./date-picker.models.js";

export interface DatePickerArgs {
  id: string;
  label: string;
  dsoDateChange: HandlerFunction;
  value: string;
  min: string;
  max: string;
  disabled: boolean;
  autofocus: boolean;
  invalid: boolean;
  describedBy: string;
}

export const datePickerArgTypes: ArgTypes<DatePickerArgs> = {
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

export function datePickerArgsMapper(a: DatePickerArgs): Required<DatePicker> {
  return {
    ...a,
    dsoDateChange: (e) => a.dsoDateChange(e.detail),
  };
}
