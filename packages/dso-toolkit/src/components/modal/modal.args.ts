import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";

import { Modal, ModalRole } from "./modal.models.js";

export interface ModalArgs {
  fullscreen: boolean;
  modalTitle: string;
  role: ModalRole;
  closable: boolean;
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
  closable: {
    control: {
      type: "boolean",
    },
  },
  dsoClose: argTypeAction(),
};

export function modalArgsMapper<TemplateFnReturnType>(
  a: ModalArgs,
  body: TemplateFnReturnType,
  footer?: TemplateFnReturnType,
): Modal<TemplateFnReturnType> {
  return {
    ...a,
    body,
    footer,
    dsoClose: (e) => a.dsoClose(e.detail),
  };
}
