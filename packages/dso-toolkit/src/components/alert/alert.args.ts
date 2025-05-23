import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook";

import { Alert, AlertStatus } from "./alert.models.js";

export interface AlertArgs {
  status: AlertStatus;
  click: HandlerFunction;
  compact: boolean;
  withRoleAlert: boolean;
  withButton: boolean;
  closable: boolean;
  dsoClose: HandlerFunction;
}

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
  closable: {
    control: {
      type: "boolean",
    },
  },
  click: {
    action: "closed",
  },
  dsoClose: {
    ...noControl,
    action: "dsoClose",
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
    closable: a.closable,
    dsoClose: a.dsoClose,
  };
}
