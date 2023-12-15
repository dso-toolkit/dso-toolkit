import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";
import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";
import { Card, imageShapes } from "./card.models.js";

export interface CardArgs {
  label: string;
  href: string;
  selectable: boolean;
  interactions: Array<Button | Label | Toggletip<never>>;
  image: string | undefined;
  imageShape: (typeof imageShapes)[number];
  clickable: boolean | "legacy";
  dsoCardClicked: HandlerFunction;
}

export const cardArgTypes: ArgTypes<CardArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  href: {
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
    options: imageShapes,
    control: {
      type: "select",
    },
    if: { arg: "image" },
  },
  dsoCardClicked: {
    ...noControl,
    action: "dsoCardClicked",
  },
  clickable: {
    options: [false, true, "legacy"],
    control: {
      type: "select",
    },
  },
};

export function cardArgsMapper<TemplateFnReturnType>(
  a: CardArgs,
  content: TemplateFnReturnType,
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
    clickable: a.clickable !== false,
    legacy: a.clickable === "legacy",
    dsoCardClicked: (e) => a.dsoCardClicked(e.detail),
  };
}
