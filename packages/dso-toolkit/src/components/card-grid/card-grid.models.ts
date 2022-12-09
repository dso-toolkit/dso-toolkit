import { Card } from "../card/card.models.js";

export interface CardGrid<TemplateFnReturnType> {
  cards: Card<TemplateFnReturnType>[];
}
