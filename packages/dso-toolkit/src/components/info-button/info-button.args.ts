import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

import { InfoButton } from "./info-button.models.js";

export interface InfoButtonArgs {
  active: boolean;
  secondary: boolean;
  label: string;
  dsoToggle: HandlerFunction;
}

export const infoButtonArgTypes: ArgTypes<InfoButtonArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  active: {
    control: {
      type: "boolean",
    },
  },
  secondary: {
    control: {
      type: "boolean",
    },
  },
  dsoToggle: {
    ...noControl,
  },
};

export function infoButtonArgsMapper(a: InfoButtonArgs): Required<InfoButton> {
  return { ...a };
}
