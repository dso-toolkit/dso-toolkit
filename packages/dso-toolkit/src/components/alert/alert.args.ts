import { ArgTypes } from "@storybook/types";

import { HandlerFunction } from "@storybook/addon-actions";

import { Alert, AlertStatus } from "./alert.models.js";

export interface AlertArgs {
  status: AlertStatus;
  click: HandlerFunction;
  compact: boolean;
  withRoleAlert: boolean;
  withButton: boolean;
}

export const alertArgs: Pick<AlertArgs, "withButton" | "withRoleAlert"> = {
  withButton: true,
  withRoleAlert: false,
};

export const alertArgTypes: ArgTypes<AlertArgs> = {
  status: {
    options: ["success", "info", "warning", "error"],
    control: {
      type: "select",
    },
  },
  compact: {
    control: {
      type: "boolean",
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
  message: TemplateFnReturnType,
): Alert<TemplateFnReturnType> {
  return {
    message,
    status: a.status,
    compact: a.compact,
    onClick: a.withButton ? () => a.click(a) : undefined,
    withRoleAlert: a.withRoleAlert,
  };
}
