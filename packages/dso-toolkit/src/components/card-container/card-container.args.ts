import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { CardArgs, cardArgsMapper } from "../card/card.args.js";
import { CardContainer, CardContainerMode } from "./card-container.models.js";

export interface CardContainerArgs {
  mode: CardContainerMode;
  cards: CardArgs[];
}

export const cardContainerArgTypes: ArgTypes<CardContainerArgs> = {
  mode: {
    options: ["list", "grid"],
    control: {
      type: "select",
    },
  },
  cards: {
    ...noControl,
  },
};

export const cardContainerArgs: { cards: CardArgs[] } = {
  cards: [
    {
      label: "Begrippen uit de Omgevingswet",
      href: "#",
      selectable: true,
      interactions: [],
      image: undefined,
      imageShape: "normal",
      clickable: false,
    },
    {
      label: "Activiteiten",
      href: "#",
      interactions: [
        {
          type: "button",
          variant: "tertiary",
          label: "Toon informatie",
          icon: {
            icon: "info",
          },
        },
      ],
      selectable: false,
      image: undefined,
      imageShape: "normal",
      clickable: false,
    },
    {
      label: "Werkzaamheden",
      href: "#",
      image: "images/rectangle1.png",
      selectable: false,
      interactions: [],
      imageShape: "normal",
      clickable: false,
    },
    {
      label: "Waardelijsten",
      href: "#",
      selectable: false,
      interactions: [],
      image: undefined,
      imageShape: "normal",
      clickable: false,
    },
    {
      label: "Bronnen",
      href: "#",
      selectable: false,
      interactions: [],
      image: undefined,
      imageShape: "normal",
      clickable: false,
    },
    {
      label: "Informatieproducten",
      href: "#",
      selectable: false,
      interactions: [],
      image: undefined,
      imageShape: "normal",
      clickable: false,
    },
  ],
};

export function cardContainerArgsMapper<TemplateFnReturnType>(
  a: CardContainerArgs,
  content: TemplateFnReturnType[],
): CardContainer<TemplateFnReturnType> {
  return {
    ...a,
    cards: a.cards.map((card, index) => {
      const c = content[index];
      if (!c) {
        throw new Error("No content found for index");
      }

      return cardArgsMapper(card, c);
    }),
  };
}
