import { Card } from "../card/card.models.js";
import { DocumentCard } from "../document-card/document-card.models.js";
import { PlekinfoCard } from "../plekinfo-card/plekinfo-card.models.js";

export interface CardContainer<TemplateFnReturnType> {
  mode: CardContainerMode;
  cards: Card<TemplateFnReturnType>[] | DocumentCard<TemplateFnReturnType>[] | PlekinfoCard<TemplateFnReturnType>[];
}

export type CardContainerMode = "list" | "grid";
