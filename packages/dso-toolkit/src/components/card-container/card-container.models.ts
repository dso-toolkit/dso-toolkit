import { Card } from "../card";
import { DocumentCard } from "../document-card";
import { PlekinfoCard } from "../plekinfo-card";

export interface CardContainer<TemplateFnReturnType> {
  mode: CardContainerMode;
  cards: (Card<TemplateFnReturnType> | DocumentCard<TemplateFnReturnType> | PlekinfoCard<TemplateFnReturnType>)[];
}

export type CardContainerMode = "list" | "grid";
