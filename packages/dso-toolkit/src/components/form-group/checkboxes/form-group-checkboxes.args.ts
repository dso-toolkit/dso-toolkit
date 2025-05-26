import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";
import { v4 as uuidv4 } from "uuid";

import { noControl } from "../../../storybook";

import { FormGroupCheckboxes } from "./form-group-checkboxes.models";

export interface FormGroupCheckboxesArgs {
  id: string;
  label: string;
  state?: "invalid" | "valid";
  required: boolean;
  disabled: boolean;
  errorText?: string;
  helpText?: string;
  infoButtonHandler: HandlerFunction;
  infoButtonLabel: string;
  infoActive: boolean;
  infoText: string;
  infoCloseHandler: HandlerFunction;
  infoFixed: boolean;
}

export const formGroupCheckboxesArgTypes: ArgTypes<FormGroupCheckboxesArgs> = {
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
  infoActive: {
    control: {
      type: "boolean",
    },
  },
  infoButtonHandler: {
    ...noControl,
    action: "infoButton click",
  },
  infoButtonLabel: {
    control: {
      type: "text",
    },
  },
  infoText: {
    control: {
      type: "text",
    },
  },
  infoCloseHandler: {
    ...noControl,
    action: "info close click",
  },
  infoFixed: {
    control: {
      type: "boolean",
    },
  },
};

export function formGroupCheckboxesArgsMapper<TemplateFnReturnType>(
  a: FormGroupCheckboxesArgs,
): FormGroupCheckboxes<TemplateFnReturnType> {
  return {
    group: "checkboxes",
    id: a.id,
    label: a.label,
    required: a.required,
    disabled: a.disabled,
    state: a.state,
    errorText: a.errorText,
    helpText: a.helpText,
    selectables: [
      {
        id: uuidv4(),
        value: "optie-1",
        type: "checkbox",
        label: "een",
      },
      {
        id: uuidv4(),
        value: "optie-2",
        type: "checkbox",
        label: "twee",
      },
      {
        id: uuidv4(),
        value: "opties-3",
        type: "checkbox",
        label: "drie",
      },
    ],
    infoButton:
      a.infoButtonLabel && a.infoText
        ? {
            dsoToggle: a.infoButtonHandler,
            active: a.infoActive,
            label: a.infoButtonLabel,
          }
        : undefined,
    info:
      a.infoButtonLabel && a.infoText
        ? {
            active: a.infoActive,
            fixed: a.infoFixed,
            dsoClose: a.infoCloseHandler,
            content: a.infoText,
          }
        : undefined,
  };
}
