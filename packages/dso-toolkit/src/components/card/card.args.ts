import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";
import { AnchorArgs } from "../anchor/anchor.args.js";
import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";
import { Card, imageShapes } from "./card.models.js";

export interface CardArgs {
  label: string;
  href?: string;
  mode?: AnchorArgs["mode"];
  selectable: boolean;
  interactions: Array<Button | Label | Toggletip<never>>;
  image: string | undefined;
  imageShape: (typeof imageShapes)[number];
  clickable: boolean;
  dsoCardClicked?: HandlerFunction;
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
  mode: {
    options: [undefined, "download", "extern"],
    control: {
      type: "select",
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
    control: {
      type: "boolean",
    },
  },
};

export function cardArgsMapper<TemplateFnReturnType>(
  a: CardArgs,
  content: TemplateFnReturnType,
): Card<TemplateFnReturnType> {
  return {
    label: a.label,
    href: a.href || undefined,
    mode: a.mode || undefined,
    clickable: a.clickable,
    image: a.image,
    imageShape: a.imageShape,
    interactions: a.interactions,
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
    dsoCardClicked: (e) => a.dsoCardClicked?.(e.detail),
  };
}
