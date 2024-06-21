import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";
import { AnchorArgs } from "../anchor/anchor.args.js";
import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";
import { Card, imageShapes } from "./card.models.js";
import { SlideToggle } from "../slide-toggle";

export interface CardArgs {
  label: string;
  href?: string;
  mode?: AnchorArgs["mode"];
  selectable: boolean;
  interactions: Array<Button | Label | Toggletip<never> | SlideToggle>;
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

export const cardContent: CardArgs = {
  clickable: false,
  imageShape: "normal",
  interactions: [],
  label: "Omgevingsplan Nieuwegein",
  href: "#",
  selectable: false,
  image: undefined,
};

export const cardContentButton: CardArgs = {
  ...cardContent,
  interactions: [
    {
      variant: "tertiary",
      label: "Toon informatie",
      icon: {
        icon: "info",
      },
      screenreaderSuffix: `over "${cardContent.label}"`,
    },
  ],
};

export const cardContentToggletip: CardArgs = {
  ...cardContent,
  interactions: [
    {
      children: "Extra informatie",
      label: `Toon informatie over "${cardContent.label}"`,
      position: "left",
      small: false,
      secondary: false,
    },
  ],
};

export const cardContentLabel: CardArgs = {
  ...cardContent,
  interactions: [
    {
      status: "warning",
      compact: true,
      label: "Ontwerp",
    },
  ],
};

export const cardContentSlideToggle: CardArgs = {
  ...cardContent,
  interactions: [
    {
      checked: false,
      accessibleLabel: "sr-only label van het schuifje",
    },
  ],
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
