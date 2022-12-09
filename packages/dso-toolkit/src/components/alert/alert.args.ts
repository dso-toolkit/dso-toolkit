import { ArgTypes } from "../../storybook/index.js";

import { HandlerFunction } from "@storybook/addon-actions";

import { Alert, AlertType } from "./alert.models.js";

export interface AlertArgs {
  status: AlertType;
  click: HandlerFunction;
  withRoleAlert: boolean;
  withButton: boolean;
}

export const alertArgTypes: ArgTypes<AlertArgs> = {
  status: {
    options: ["success", "info", "warning", "error"],
    control: {
      type: "select",
    },
  },
  withRoleAlert: {
    control: {
      type: "boolean",
    },
  },
  withButton: {
    control: {
      type: "boolean",
    },
  },
  click: {
    action: "closed",
  },
};

export function alertArgsMapper<TemplateFnReturnType>(
  a: AlertArgs,
  message: TemplateFnReturnType
): Alert<TemplateFnReturnType> {
  return {
    message,
    status: a.status,
    onClick: a.withButton ? () => a.click(a) : undefined,
    withRoleAlert: a.withRoleAlert,
  };
}
