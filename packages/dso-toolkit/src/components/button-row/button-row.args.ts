import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook/no-control.js";
import { Button } from "../button/button.models.js";

import { ButtonRow } from "./button-row.models.js";

export interface ButtonRowArgs {
  buttons: Button[];
  emphasized?: boolean;
  align: "center" | "right" | undefined;
  noWrap?: boolean;
}

export const buttonRowArgTypes: ArgTypes<ButtonRowArgs> = {
  buttons: {
    ...noControl,
  },
  emphasized: {
    control: {
      type: "boolean",
    },
  },
  align: {
    options: ["center", "right", undefined],
    control: {
      type: "select",
    },
  },
  noWrap: {
    control: {
      type: "boolean",
    },
  },
};

export function buttonRowArgsMapper(a: ButtonRowArgs): ButtonRow {
  return {
    ...a,
  };
}
