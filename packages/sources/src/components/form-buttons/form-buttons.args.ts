import { ArgTypes } from "../../storybook";

import { Button } from "../button/button.models";

import { FormButtons } from "./form-buttons.models";

export interface FormButtonsArgs {
  formModifier?: string;
  buttons: Button[];
  asideButtons: Button[];
}

export const formButtonsArgTypes: ArgTypes<FormButtonsArgs> = {
  formModifier: {
    control: {
      disable: true,
    },
  },
  buttons: {
    control: {
      disable: true,
    },
  },
  asideButtons: {
    control: {
      disable: true,
    },
  },
};

export function formButtonsArgsMapper(a: FormButtonsArgs): FormButtons {
  return {
    formModifier: a.formModifier,
    buttons: a.buttons,
    asideButtons: a.asideButtons,
  };
}
