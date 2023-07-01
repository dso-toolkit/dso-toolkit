import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../../storybook/index.js";
import { selectOptionGroupContent, selectOptionsContent } from "../content/select.content.js";

import { FormGroupSelect } from "../form.models.js";

export interface FormGroupSelectArgs {
  metOptGroup: boolean;
  id: string;
  label: string;
  state?: "invalid" | "valid";
  required: boolean;
  disabled: boolean;
  multiple: boolean;
  errorText?: string;
  helpText?: string;
  infoButtonHandler: HandlerFunction;
  infoButtonLabel: string;
  infoActive: boolean;
  infoText: string;
  infoCloseHandler: HandlerFunction;
  infoFixed: boolean;
}

export const formGroupSelectArgTypes: ArgTypes<FormGroupSelectArgs> = {
  metOptGroup: {
    control: {
      type: "boolean",
    },
  },
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
  multiple: {
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

export function formGroupSelectArgsMapper<TemplateFnReturnType>(
  a: FormGroupSelectArgs
): FormGroupSelect<TemplateFnReturnType> {
  return {
    group: "select",
    id: a.id,
    label: a.label,
    items: a.metOptGroup ? selectOptionGroupContent : selectOptionsContent,
    required: a.required,
    disabled: a.disabled,
    multiple: a.multiple,
    state: a.state,
    errorText: a.errorText,
    helpText: a.helpText,
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
