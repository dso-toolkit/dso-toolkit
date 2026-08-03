import { ArgTypes } from "storybook/internal/types";

import { buttons } from "./button-group.content.js";
import { ButtonGroup } from "./button-group.models.js";

export interface ButtonGroupArgs {
  direction: "column" | "row";
  buttonElement: "button" | "anchor" | "icon-button";
  buttonVariant: "secondary" | "map";
}

export const buttonGroupArgs: ButtonGroupArgs = {
  direction: "row",
  buttonElement: "button",
  buttonVariant: "map",
};

export const buttonGroupArgTypes: ArgTypes<ButtonGroupArgs> = {
  direction: {
    options: ["row", "column"],
    control: {
      type: "select",
    },
  },
  buttonElement: {
    options: ["button", "anchor", "icon-button"],
    control: {
      type: "select",
    },
  },
  buttonVariant: {
    options: ["map", "secondary"],
    control: {
      type: "select",
    },
  },
};

export function buttonGroupArgsMapper(a: ButtonGroupArgs): ButtonGroup {
  return {
    direction: a.direction,
    buttons: buttons(a.direction, a.buttonVariant, a.buttonElement),
  };
}
