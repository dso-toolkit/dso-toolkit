import { ArgTypes, noControl } from "../../storybook";
import { CardArgs, cardArgsMapper } from "../card/card.args";
import { CardList } from "./card-list.models";

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
