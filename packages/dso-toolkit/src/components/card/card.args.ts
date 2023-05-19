import { HandlerFunction } from "@storybook/addon-actions";

import { ArgTypes, noControl } from "../../storybook/index.js";
import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";
import { Card, imageShapes } from "./card.models.js";

export interface CardArgs {
  label: string;
  selectable: boolean;
  interactions: Array<Button | Label | Toggletip<never>>;
  image: string | undefined;
  imageShape: (typeof imageShapes)[number];
  clickable: boolean;
  dsoCardClicked: HandlerFunction;
}

export const cardArgTypes: ArgTypes<CardArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  selectable: {
    ...noControl,
  },
  interactions: {
    ...noControl,
  },
  image: {
    ...noControl,
  },
  imageShape: {
    control: {
      options: imageShapes,
      type: "select",
    },
    if: { arg: "image" },
  },
  dsoCardClicked: {
    ...noControl,
    action: "dsoCardClicked",
  },
  clickable: {
    control: {
      type: "boolean",
    },
  },
};

export function cardArgsMapper<TemplateFnReturnType>(
  a: CardArgs,
  content: TemplateFnReturnType
): Card<TemplateFnReturnType> {
  return {
    ...a,
    selectable: a.selectable
      ? {
          id: "1",
          type: "checkbox",
          value: "1",
          labelledById: "card-title",
          slot: "selectable",
        }
      : undefined,
    content,
    clickable: a.clickable ?? true,
    dsoCardClicked: (e) => a.dsoCardClicked(e.detail),
  };
}
