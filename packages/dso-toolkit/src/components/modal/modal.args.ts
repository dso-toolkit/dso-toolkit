import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { Modal, ModalRole } from "./modal.models.js";

export interface ModalArgs {
  fullscreen: boolean;
  modalTitle: string;
  role: ModalRole;
  showCloseButton: boolean;
  dsoClose: HandlerFunction;
}

export const modalArgTypes: ArgTypes<ModalArgs> = {
  fullscreen: {
    control: {
      type: "boolean",
    },
  },
  modalTitle: {
    control: {
      type: "text",
    },
  },
  role: {
    options: [undefined, "dialog", "alert", "alertdialog"],
    control: {
      type: "select",
    },
  },
  showCloseButton: {
    control: {
      type: "boolean",
    },
  },
  dsoClose: {
    ...noControl,
    action: "dsoClose",
  },
};

export function modalArgsMapper<TemplateFnReturnType>(
  a: ModalArgs,
  body: TemplateFnReturnType,
  footer?: TemplateFnReturnType
): Modal<TemplateFnReturnType> {
  return {
    ...a,
    body,
    footer,
  };
}
