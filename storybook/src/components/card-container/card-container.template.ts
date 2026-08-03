import { TemplateResult, html, nothing } from "lit-html";

import { Card, isCardInterface } from "../card/card.models.js";
import { cardTemplate } from "../card/card.template.js";
import { DocumentCard, isDocumentCardInterface } from "../document-card/document-card.models.js";
import { documentCardTemplate } from "../document-card/document-card.template.js";
import { PlekinfoCard } from "../plekinfo-card/plekinfo-card.models.js";

import { CardContainer } from "./card-container.models.js";

export function cardContainerTemplate({ mode, cards }: CardContainer<TemplateResult>) {
  return html`
    <dso-card-container mode=${mode}>
      ${cards.map((card) => (mode === "list" ? html`<li>${template(card)}</li>` : template(card)))}
    </dso-card-container>
  `;
}

function template(card: Card<TemplateResult> | DocumentCard<TemplateResult> | PlekinfoCard<TemplateResult>) {
  if (isCardInterface(card)) {
    return cardTemplate(card);
  }
  if (isDocumentCardInterface(card)) {
    return documentCardTemplate(card);
  }
  return nothing;
}
