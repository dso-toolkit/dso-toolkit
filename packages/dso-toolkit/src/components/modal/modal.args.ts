import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { Modal, ModalRole } from "./modal.models.js";

export interface ModalArgs {
  fullscreen: boolean;
  modalTitle: string;
  role: ModalRole;
  showCloseButton: boolean;
  initialFocus: string;
  dsoClose: HandlerFunction;
}

export const modalArgTypes: ArgTypes<ModalArgs> = {
  fullscreen: {
    ...noControl,
  },
  modalTitle: {
    ...noControl,
  },
  role: {
    ...noControl,
  },
  initialFocus: {
    type: "string",
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
