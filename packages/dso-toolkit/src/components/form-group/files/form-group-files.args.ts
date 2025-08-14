import { ArgTypes } from "storybook/internal/types";

import { FormGroupFiles, FormGroupFilesFile } from "./form-group-files.models";

export interface FormGroupFilesArgs {
  id: string;
  label: string;
  addFileButtonVariant: "primary" | "secondary";
  state?: "invalid" | "valid";
  required: boolean;
  disabled: false;
  errorText: string;
  warning: string;
}

export const formGroupFilesArgs: FormGroupFilesArgs = {
  id: "mijn-id",
  label: "Files",
  required: false,
  disabled: false,
  errorText: "Voeg een document toe.",
  warning:
    "U vraagt of wij een document vertrouwelijk willen behandelen. Er zal worden beoordeeld of uw vraag terecht is. U krijgt hiervan bericht.",
  addFileButtonVariant: "primary",
};

export const formGroupFilesArgTypes: ArgTypes<FormGroupFilesArgs> = {
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
  addFileButtonVariant: {
    options: ["primary", "secondary"],
    control: {
      type: "select",
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
  warning: {
    control: {
      type: "text",
    },
  },
};

export function formGroupFilesArgsMapper<TemplateFnReturnType>(
  a: FormGroupFilesArgs,
  files: FormGroupFilesFile[],
): FormGroupFiles<TemplateFnReturnType> {
  return {
    id: a.id,
    label: a.label,
    group: "files",
    addFileButtonVariant: a.addFileButtonVariant,
    state: a.state,
    disabled: a.disabled,
    errorText: a.errorText,
    warning: a.warning,
    files,
  };
}
