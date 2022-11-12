import { Card } from "../card/card.models";
import { CardGrid } from "./card-grid.models";

export function cardGridArgsMapper<TemplateFnReturnType>(
  cards: Card<TemplateFnReturnType>[]
): CardGrid<TemplateFnReturnType> {
  return {
    cards,
  };
}
