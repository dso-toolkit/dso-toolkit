import { ArgTypes } from "@storybook/types";
import { FormGroupDatePicker } from "../models/form-group-date-picker.model.js";

export interface FormGroupDatePickerArgs {
  id: string;
  state?: "invalid" | "valid";
  required: boolean;
  disabled: boolean;
  errorText?: string;
  helpText?: string;
}

export const formGroupDatePickerArgTypes: ArgTypes<FormGroupDatePickerArgs> = {
  id: {
    control: {
      type: "text",
    },
  },
  state: {
    options: [undefined, "invalid", "valid"],
    control: {
      type: "select",
    },
  },
  required: {
    control: {
      type: "boolean",
    },
  },
  disabled: {
    control: {
      type: "boolean",
    },
  },
  errorText: {
    control: {
      type: "text",
    },
  },
  helpText: {
    control: {
      type: "text",
    },
  },
};

export function formGroupDatePickerArgsMapper<TemplateFnReturnType>(
  a: FormGroupDatePickerArgs
): FormGroupDatePicker<TemplateFnReturnType> {
  return {
    group: "date-picker",
    id: a.id,
    required: a.required,
    disabled: a.disabled,
    state: a.state,
    errorText: a.errorText,
    helpText: a.helpText,
    datePicker: {
      disabled: a.disabled,
      invalid: a.state === "invalid",
    },
  };
}
