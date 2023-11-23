import { Card } from "../card/card.models.js";
import { CardGrid } from "./card-grid.models.js";

export function cardGridArgsMapper<TemplateFnReturnType>(
  cards: Card<TemplateFnReturnType>[],
): CardGrid<TemplateFnReturnType> {
  return {
    cards,
  };
}
