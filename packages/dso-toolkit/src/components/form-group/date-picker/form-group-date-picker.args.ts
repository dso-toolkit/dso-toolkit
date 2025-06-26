import { ArgTypes } from "@storybook/types";

import { FormGroupDatePicker } from "./form-group-date-picker.models";

export interface FormGroupDatePickerArgs {
  id: string;
  animatable?: boolean;
  label: string;
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
  animatable: {
    control: {
      type: "boolean",
    },
  },
  label: {
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
  a: FormGroupDatePickerArgs,
): FormGroupDatePicker<TemplateFnReturnType> {
  return {
    group: "date-picker",
    id: a.id,
    animatable: a.animatable,
    label: a.label,
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
