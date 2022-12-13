import { ArgTypes, noControl } from "../../storybook/index.js";

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

export function cardListArgsMapper<TemplateFnReturnType>(
  a: CardListArgs,
  content: TemplateFnReturnType[]
): CardList<TemplateFnReturnType> {
  return {
    ...a,
    cards: a.cards.map((card, index) => cardArgsMapper(card, content[index])),
  };
}
