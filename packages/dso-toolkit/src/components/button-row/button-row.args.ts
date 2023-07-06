import { ArgTypes } from "@storybook/types";

import { Button } from "../button/button.models.js";

import { ButtonRow } from "./button-row.models.js";
import { noControl } from "../../storybook/no-control.js";

export interface ButtonRowArgs {
  buttons: Button[];
  emphasized?: boolean;
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
};

export function buttonRowArgsMapper(a: ButtonRowArgs): ButtonRow {
  return {
    ...a,
  };
}
