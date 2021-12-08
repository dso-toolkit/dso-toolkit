import { Card } from "../card/card.models";

export interface CardList<TemplateFnReturnType> {
  cards: Card<TemplateFnReturnType>[];
}
