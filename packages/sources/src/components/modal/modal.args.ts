import { ArgTypes, noControl } from "../../storybook";

import { Button } from "../button/button.models";

import { Modal } from "./modal.models";

export interface ModalArgs {
  variant: "active" | "passive" | "confirm" | "loading";
  id: string;
  role: "alert" | "dialog";
  body: string;
  heading: string;
  buttons: Button[];
}

export interface ModalLoadingArgs {
  variant: "loading";
  role: "alert";
  progressIndicatorLabel: string;
}

export const modalArgTypes: ArgTypes<ModalArgs> = {
  id: {
    ...noControl,
  },
  role: {
    ...noControl,
  },
  heading: {
    control: {
      type: "text",
    },
  },
  body: {
    control: {
      type: "text",
    },
  },
  variant: {
    ...noControl,
  },
  buttons: {
    ...noControl,
  },
};

export const modalLoadingArgTypes: ArgTypes<ModalLoadingArgs> = {
  progressIndicatorLabel: {
    control: {
      type: "text",
    },
  },
  role: {
    ...noControl,
  },
  variant: {
    ...noControl,
  },
};

export function modalArgsMapper<TemplateFnReturnType>(a: ModalArgs): Modal<TemplateFnReturnType> {
  return {
    role: a.role,
    body: a.body,
    confirm: a.variant === "passive" || undefined,
    heading: a.heading,
    id: a.id,
    buttons: a.buttons,
  };
}
