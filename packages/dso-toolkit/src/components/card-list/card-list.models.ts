import { Card } from "../card/card.models.js";

export interface CardList<TemplateFnReturnType> {
  cards: Card<TemplateFnReturnType>[];
}
