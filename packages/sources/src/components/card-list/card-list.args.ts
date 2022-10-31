import { ArgTypes } from "../../storybook";

import { Card } from "../card/card.models";

import { CardList } from "./card-list.models";

export interface CardListArgs<TemplateFnReturnType> {
  cards: Card<TemplateFnReturnType>[];
}

export const cardListArgTypes: ArgTypes<CardListArgs<never>> = {
  cards: {
    control: {
      disable: true,
    },
  },
};

export function cardListArgsMapper<TemplateFnReturnType>(
  a: CardListArgs<TemplateFnReturnType>
): CardList<TemplateFnReturnType> {
  return {
    cards: a.cards,
  };
}
