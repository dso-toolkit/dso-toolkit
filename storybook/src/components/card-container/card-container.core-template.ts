import { html, TemplateResult } from "lit-html";

import { CardContainer } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const coreCardContainer: ComponentImplementation<CardContainer<TemplateResult>> = {
  component: "cardContainer",
  implementation: "core",
  template: ({ cardTemplate }) =>
    function cardContainerTemplate({ mode, cards }) {
      return html`
        <dso-card-container mode=${mode}>
          ${cards.map((card) => (mode === "list" ? html`<li>${cardTemplate(card)}</li>` : cardTemplate(card)))}
        </dso-card-container>
      `;
    },
};
