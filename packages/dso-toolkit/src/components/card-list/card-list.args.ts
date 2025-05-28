import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";
import { CardArgs, cardArgsMapper } from "../card/card.args.js";

import { CardList } from "./card-list.models.js";

export interface CardListArgs {
  cards: CardArgs[];
}

export const cardListArgTypes: ArgTypes<CardListArgs> = {
  cards: {
    ...noControl,
  },
};

export const cardListArgs: CardListArgs = {
  cards: [
    {
      label: "Omgevingsplan Nieuwegein",
      selectable: true,
      interactions: [],
      href: "#",
      active: false,
      dsoCardClick() {},
    },
    {
      label: "Brouwersmolen",
      selectable: false,
      interactions: [],
      href: "#",
      active: false,
      dsoCardClick() {},
    },
    {
      label: "Maximum bouwhoogte",
      selectable: false,
      interactions: [],
      href: "#",
      active: false,
      dsoCardClick() {},
    },
  ],
};

export function cardListArgsMapper<TemplateFnReturnType>(
  a: CardListArgs,
  content: TemplateFnReturnType[],
): CardList<TemplateFnReturnType> {
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
