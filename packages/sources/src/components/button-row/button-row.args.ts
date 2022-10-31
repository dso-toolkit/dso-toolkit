import { ArgTypes } from "../../storybook";

import { Button } from "../button/button.models";

import { ButtonRow } from "./button-row.models";

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
