import { CardList } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssCardList: ComponentImplementation<CardList<TemplateResult>> = {
  component: "cardList",
  implementation: "html-css",
  template: ({ cardTemplate }) =>
    function cardListTemplate({ cards }) {
      return html`
        <ul class="dso-card-list">
          ${cards.map((card) => html`<li>${cardTemplate(card)}</li>`)}
        </ul>
      `;
    },
};
