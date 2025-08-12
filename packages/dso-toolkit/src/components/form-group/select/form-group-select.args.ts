import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../../storybook";

import { selectOptionGroupContent, selectOptionsContent } from "./form-group-select.content";
import { FormGroupSelect } from "./form-group-select.models";

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

export const formGroupSelectArgs: FormGroupSelectArgs = {
  metOptGroup: false,
  id: "mijn-id",
  label: 'Vul "een waarde" in',
  required: false,
  disabled: false,
  multiple: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
  infoButtonHandler: fn(),
  infoCloseHandler: fn(),
};

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

export function formGroupSelectArgsMapper<TemplateFnReturnType>(
  a: FormGroupSelectArgs,
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
