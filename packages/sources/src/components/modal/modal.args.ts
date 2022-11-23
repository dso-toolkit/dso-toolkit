import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../storybook";
import { Modal, ModalRole } from "./modal.models";

export interface ModalArgs {
  modalTitle: string;
  role: ModalRole;
  showCloseButton: boolean;
  dsoClose: HandlerFunction;
}

export const modalArgTypes: ArgTypes<ModalArgs> = {
  modalTitle: {
    ...noControl,
  },
  role: {
    ...noControl,
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
