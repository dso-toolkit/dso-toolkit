import { ArgTypes } from "../../storybook";

import { Button } from "../button/button.models";

import { Card } from "./card.models";

export interface CardArgs {
  label: string;
  selectable: boolean;
  interactions: Button[];
  image: string | undefined;
}

export const cardArgTypes: ArgTypes<CardArgs> = {
  label: {
    control: {
      type: "string",
    },
  },
  selectable: {
    control: {
      type: "boolean",
    },
  },
  interactions: {
    control: {
      disable: true,
    },
  },
  image: {
    control: {
      type: "text",
    },
  },
};

export function cardArgsMapper<TemplateFnReturnType>(
  a: CardArgs,
  content: TemplateFnReturnType
): Card<TemplateFnReturnType> {
  return {
    label: a.label,
    selectable: a.selectable
      ? {
          id: "1",
          label: "Selecteer",
          dsoChange: () => undefined,
          type: "checkbox",
          value: "1",
        }
      : undefined,
    content,
    interactions: a.interactions,
    image: a.image,
  };
}
