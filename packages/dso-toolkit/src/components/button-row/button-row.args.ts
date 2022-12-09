import { ArgTypes } from "../../storybook/index.js";

import { Button } from "../button/button.models.js";

import { ButtonRow } from "./button-row.models.js";

export interface ButtonRowArgs {
  buttons: Button[];
}

export const buttonRowArgTypes: ArgTypes<ButtonRowArgs> = {
  buttons: {
    control: {
      disable: true,
    },
  },
};

export function buttonRowArgsMapper(a: ButtonRowArgs): ButtonRow {
  return {
    buttons: a.buttons,
  };
}
