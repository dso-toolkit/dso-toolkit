import { AttachmentsCounter } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const cssAttachmentsCounter: ComponentImplementation<AttachmentsCounter> = {
  component: "attachmentsCounter",
  implementation: "html-css",
  template: () =>
    function attachmentsCounterTemplate({ count }) {
      return html`
        <span class="dso-attachments">
          ${count} <span class="sr-only">${count !== 1 ? "bijlagen" : "bijlage"}</span>
        </span>
      `;
    },
};
