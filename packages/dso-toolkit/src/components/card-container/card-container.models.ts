import { Card } from "../card/card.models.js";

export interface CardContainer<TemplateFnReturnType> {
  mode: CardContainerMode;
  cards: Card<TemplateFnReturnType>[];
}

export type CardContainerMode = "list" | "grid";
