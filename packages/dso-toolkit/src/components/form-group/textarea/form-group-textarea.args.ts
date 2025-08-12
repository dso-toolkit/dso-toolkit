import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../../storybook";

import { FormGroupTextarea } from "./form-group-textarea.models";

export interface FormGroupTextareaArgs {
  id: string;
  label: string;
  state?: "invalid" | "valid";
  value: string;
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  errorText?: string;
  rows?: number;
  helpText?: string;
  placeholder?: string;
  feedbackIcon?: "email" | "energy";
  infoButtonHandler: HandlerFunction;
  infoButtonLabel: string;
  infoActive: boolean;
  infoText: string;
  infoCloseHandler: HandlerFunction;
  infoFixed: boolean;
}

export const formGroupTextareaArgs: FormGroupTextareaArgs = {
  id: "mijn-id",
  label: 'Vul "een waarde" in',
  value: "een waarde",
  required: false,
  disabled: false,
  readonly: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
  infoButtonHandler: fn(),
  infoCloseHandler: fn(),
};

export const formGroupTextareaArgTypes: ArgTypes<FormGroupTextareaArgs> = {
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
  value: {
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
  readonly: {
    control: {
      type: "boolean",
    },
  },
  rows: {
    control: {
      type: "number",
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
  placeholder: {
    control: {
      type: "text",
    },
  },
  feedbackIcon: {
    options: [undefined, "email", "energy"],
    control: {
      type: "select",
    },
  },
  infoActive: {
    control: {
      type: "boolean",
    },
  },
  infoButtonHandler: argTypeAction(),
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
  infoCloseHandler: argTypeAction(),
  infoFixed: {
    control: {
      type: "boolean",
    },
  },
};

export function formGroupTextareaArgsMapper<TemplateFnReturnType>(
  a: FormGroupTextareaArgs,
): FormGroupTextarea<TemplateFnReturnType> {
  return {
    group: "textarea",
    id: a.id,
    label: a.label,
    value: a.value,
    required: a.required,
    disabled: a.disabled,
    rows: a.rows,
    readonly: a.readonly,
    state: a.state,
    errorText: a.errorText,
    helpText: a.helpText,
    placeholder: a.placeholder,
    feedback: a.feedbackIcon
      ? {
          icon: a.feedbackIcon,
        }
      : undefined,
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
