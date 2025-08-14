import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../../storybook";

import { FormGroupInput, FormGroupInputDate } from "./form-group-input.models";

export interface FormGroupInputArgs {
  id: string;
  type: "text" | "email" | "date" | "password" | "url" | "tel";
  label: string;
  state?: "invalid" | "valid";
  value: string;
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  errorText?: string;
  size?: number;
  helpText?: string;
  placeholder?: string;
  feedbackIcon?: "email" | "energy";
  infoButtonHandler: HandlerFunction;
  infoButtonLabel: string;
  infoActive: boolean;
  infoText: string;
  infoCloseHandler: HandlerFunction;
  infoFixed: boolean;
  min?: number;
  max?: number;
}

export const formGroupInputArgs: FormGroupInputArgs = {
  id: "mijn-id",
  type: "text",
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

export const formGroupInputArgTypes: ArgTypes<FormGroupInputArgs> = {
  id: {
    control: {
      type: "text",
    },
  },
  type: {
    options: ["text", "email", "date", "password", "url", "tel"],
    control: {
      type: "select",
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
  size: {
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
  min: {
    control: {
      type: "number",
    },
  },
  max: {
    control: {
      type: "number",
    },
  },
};

export function formGroupInputArgsMapper<TemplateFnReturnType>(
  a: FormGroupInputArgs,
): FormGroupInput<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType> {
  return {
    group: "input",
    type: a.type,
    id: a.id,
    label: a.label,
    value: a.value,
    required: a.required,
    disabled: a.disabled,
    size: a.size,
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
