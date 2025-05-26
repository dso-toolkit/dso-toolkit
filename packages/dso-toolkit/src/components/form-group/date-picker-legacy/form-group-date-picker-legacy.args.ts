import { ArgTypes } from "@storybook/types";

import { FormGroupDatePickerLegacy } from "./form-group-date-picker-legacy.models";

export interface FormGroupDatePickerLegacyArgs {
  id: string;
  state?: "invalid" | "valid";
  required: boolean;
  disabled: boolean;
  errorText?: string;
  helpText?: string;
}

export const formGroupDatePickerLegacyArgTypes: ArgTypes<FormGroupDatePickerLegacyArgs> = {
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

export function formGroupDatePickerLegacyArgsMapper<TemplateFnReturnType>(
  a: FormGroupDatePickerLegacyArgs,
): FormGroupDatePickerLegacy<TemplateFnReturnType> {
  return {
    group: "date-picker-legacy",
    id: a.id,
    required: a.required,
    disabled: a.disabled,
    state: a.state,
    errorText: a.errorText,
    helpText: a.helpText,
    datePickerLegacy: {
      disabled: a.disabled,
      invalid: a.state === "invalid",
    },
  };
}
