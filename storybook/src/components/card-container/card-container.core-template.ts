import {
  Card,
  CardContainer,
  DocumentCard,
  PlekinfoCard,
  isCardInterface,
  isDocumentCardInterface,
  isPlekinfoCardInterface,
} from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";

import { ComponentImplementation, Templates } from "../../templates";

export const coreCardContainer: ComponentImplementation<CardContainer<TemplateResult>> = {
  component: "cardContainer",
  implementation: "core",
  template: (templates) =>
    function cardContainerTemplate({ mode, cards }) {
      return html`
        <dso-card-container mode=${mode}>
          ${cards.map((card) =>
            mode === "list" ? html`<li>${template(card, templates)}</li>` : template(card, templates),
          )}
        </dso-card-container>
      `;
    },
};

function template(
  card: Card<TemplateResult> | DocumentCard<TemplateResult> | PlekinfoCard<TemplateResult>,
  { cardTemplate, documentCardTemplate, plekinfoCardTemplate }: Templates,
): TemplateResult {
  return html` ${isCardInterface(card) ? cardTemplate(card) : nothing}
  ${isDocumentCardInterface(card) ? documentCardTemplate(card) : nothing}
  ${isPlekinfoCardInterface(card) ? plekinfoCardTemplate(card) : nothing}`;
}
