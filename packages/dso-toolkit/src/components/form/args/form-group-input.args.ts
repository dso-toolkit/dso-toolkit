import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../../storybook/index.js";

import { FormGroupInput, FormGroupInputDate } from "../form.models.js";

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
