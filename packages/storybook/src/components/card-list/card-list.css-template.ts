import { CardList } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssCardList: ComponentImplementation<CardList<TemplateResult>> = {
  component: "cardList",
  implementation: "css",
  template: ({ cardTemplate }) =>
    function cardListTemplate({ cards }) {
      return html`
        <ul class="dso-card-list">
          ${cards.map((card) => html`<li>${cardTemplate(card)}</li>`)}
        </ul>
      `;
    },
};
