import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook/index.js";
import { Button } from "../button/button.models.js";
import { Label } from "../label/label.models.js";
import { LinkArgs } from "../link/link.args.js";
import { SlideToggle } from "../slide-toggle";
import { Toggletip } from "../toggletip/toggletip.models.js";

import { Card } from "./card.models.js";

export interface CardArgs {
  label: string;
  href: string;
  active: boolean;
  mode?: LinkArgs["mode"];
  selectable: boolean;
  interactions: Array<Button | Label | Toggletip<never> | SlideToggle>;
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
  selectable: {
    ...noControl,
  },
  interactions: {
    ...noControl,
  },
  dsoCardClick: {
    ...noControl,
  },
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
        icon: "info",
      },
      screenreaderSuffix: `over "${cardContent.label}"`,
    },
  ],
};

export const cardContentToggletip: Omit<CardArgs, "dsoCardClick"> = {
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
): Card<TemplateFnReturnType> {
  return {
    label: a.label,
    href: a.href,
    active: a.active,
    mode: a.mode || undefined,
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
    dsoCardClick: (e) => a.dsoCardClick(e.detail),
  };
}
