import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../storybook";
import { Button } from "../button/button.models.js";
import { InfoButton } from "../info-button";
import { Label } from "../label/label.models.js";
import { LinkArgs } from "../link/link.args.js";
import { SlideToggle } from "../slide-toggle";

import { Card } from "./card.models.js";

export interface CardArgs {
  label: string;
  href: string;
  active: boolean;
  mode?: LinkArgs["mode"];
  selectable: boolean;
  interactions: Array<Button | InfoButton<never> | Label | SlideToggle>;
  dsoCardClick: HandlerFunction;
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
  active: {
    control: {
      type: "boolean",
    },
  },
  mode: {
    options: [undefined, "download", "extern"],
    control: {
      type: "select",
    },
  },
  selectable: argTypeAction(),
  interactions: argTypeAction(),
  dsoCardClick: argTypeAction(),
};

export const cardContent: Omit<CardArgs, "dsoCardClick"> = {
  interactions: [],
  label: "Omgevingsplan Nieuwegein",
  href: "#",
  selectable: false,
  active: false,
};

export const cardContentButton: Omit<CardArgs, "dsoCardClick"> = {
  ...cardContent,
  interactions: [
    {
      variant: "tertiary",
      label: "Toon informatie",
      icon: {
        icon: "info-solid",
      },
      screenreaderSuffix: `over "${cardContent.label}"`,
    },
  ],
};

export const cardContentLabel: Omit<CardArgs, "dsoCardClick"> = {
  ...cardContent,
  interactions: [
    {
      status: "warning",
      compact: true,
      label: "Ontwerp",
    },
  ],
};

export const cardContentSlideToggle: Omit<CardArgs, "dsoCardClick"> = {
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
  infoButton?: InfoButton<TemplateFnReturnType>,
): Card<TemplateFnReturnType> {
  return {
    label: a.label,
    href: a.href,
    active: a.active,
    mode: a.mode || undefined,
    interactions: infoButton ? [infoButton] : a.interactions,
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
    dsoCardClick: (e) => a.dsoCardClick(e.detail),
  };
}
