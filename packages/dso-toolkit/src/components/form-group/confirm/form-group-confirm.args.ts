import { ArgTypes } from "storybook/internal/types";
import { v4 as uuidv4 } from "uuid";

import { FormGroupConfirm } from "./form-group-confirm.models";

export interface FormGroupConfirmArgs {
  id: string;
  state?: "invalid" | "valid";
  required: boolean;
  disabled: boolean;
  errorText?: string;
  helpText?: string;
  selectableLabel: string;
  selectableValue: string;
}

export const formGroupConfirmContent: FormGroupConfirmArgs = {
  id: "mijn-id",
  required: false,
  disabled: false,
  errorText: "Dit moet u verplicht aanvinken",
  selectableLabel: "Ik ga akkoord met de voorwaarden",
  selectableValue: "Akkoord",
};

export const formGroupConfirmArgTypes: ArgTypes<FormGroupConfirmArgs> = {
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
  selectableLabel: {
    control: {
      type: "text",
    },
  },
  selectableValue: {
    control: {
      type: "text",
    },
  },
};

export function formGroupConfirmArgsMapper<TemplateFnReturnType>(
  a: FormGroupConfirmArgs,
): FormGroupConfirm<TemplateFnReturnType> {
  return {
    group: "confirm",
    id: a.id,
    required: a.required,
    disabled: a.disabled,
    state: a.state,
    errorText: a.errorText,
    helpText: a.helpText,
    selectable: {
      id: uuidv4(),
      type: "checkbox",
      value: a.selectableValue,
      label: a.selectableLabel,
    },
  };
}
