import { CardGrid } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssCardGrid: ComponentImplementation<CardGrid<TemplateResult>> = {
  component: "cardGrid",
  implementation: "html-css",
  template: ({ cardTemplate }) =>
    function cardGridTemplate({ cards }) {
      return html`
        <!-- START DEPRECATED: use <dso-card-container> -->
        <div class="dso-card-grid">${cards.map((card) => cardTemplate(card))}</div>
        <!-- END DEPRECATED -->
      `;
    },
};
