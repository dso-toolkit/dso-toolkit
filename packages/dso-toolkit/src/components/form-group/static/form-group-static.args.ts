import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../../storybook";

import { FormGroupStatic } from "../form-group.models";

export interface FormGroupStaticArgs {
  id: string;
  label: string;
  value: string;
  edit: boolean;
  infoButtonHandler: HandlerFunction;
  infoButtonLabel: string;
  infoActive: boolean;
  infoText: string;
  infoCloseHandler: HandlerFunction;
  infoFixed: boolean;
}

export const formGroupStaticArgTypes: ArgTypes<FormGroupStaticArgs> = {
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
  edit: {
    control: {
      type: "boolean",
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

export function formGroupStaticArgsMapper<TemplateFnReturnType>(
  a: FormGroupStaticArgs,
): FormGroupStatic<TemplateFnReturnType> {
  return {
    group: "static",
    id: a.id,
    label: a.label,
    value: a.value,
    edit: a.edit,
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
