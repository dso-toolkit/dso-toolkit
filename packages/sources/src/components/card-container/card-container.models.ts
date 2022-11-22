import { Card } from "../card/card.models";

export interface CardContainer<TemplateFnReturnType> {
  mode: CardContainerMode;
  cards: Card<TemplateFnReturnType>[];
}

export type CardContainerMode = "list" | "grid";
