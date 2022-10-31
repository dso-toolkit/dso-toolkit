import { cards } from "./card-grid.demo";
import { CardGrid } from "./card-grid.models";

export function cardGridArgsMapper(): CardGrid<never> {
  return {
    cards,
  };
}
