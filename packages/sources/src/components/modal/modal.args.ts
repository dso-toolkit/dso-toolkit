import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../storybook";
import { Modal, ModalRole } from "./modal.models";

export interface ModalArgs {
  modalTitle: string;
  body: string;
  footer: string;
  role: ModalRole;
  dsoClose: HandlerFunction;
}
export const modalArgTypes: ArgTypes<ModalArgs> = {
  role: {
    ...noControl,
  },
  modalTitle: {
    ...noControl,
  },
  body: {
    ...noControl,
  },
  footer: {
    ...noControl,
  },
  dsoClose: {
    ...noControl,
    action: "dsoClose",
  },
};

export function modalArgsMapper(a: ModalArgs): Modal {
  return { ...a };
}
