import { Card } from "../..";

export interface CardGrid<TemplateFnReturnType> {
  cards: Card<TemplateFnReturnType>[];
}
