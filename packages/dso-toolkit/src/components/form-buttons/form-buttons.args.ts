import { ArgTypes } from "@storybook/types";
import { Button } from "../button/button.models.js";
import { FormButtons } from "./form-buttons.models.js";

export interface FormButtonsArgs {
  buttons: Button[];
  asideButtons: Button[];
}

export const formButtonsArgTypes: ArgTypes<FormButtonsArgs> = {
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
    buttons: a.buttons,
    asideButtons: a.asideButtons,
  };
}
