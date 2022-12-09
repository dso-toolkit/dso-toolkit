import { Modal } from "@dso-toolkit/sources";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { v4 } from "uuid";

import { ComponentImplementation } from "../../templates";

export const cssModal: ComponentImplementation<Modal<TemplateResult>> = {
  component: "modal",
  implementation: "html-css",
  template: () =>
    function modalTemplate({ modalTitle, role, showCloseButton, body, footer }) {
      const ariaId = v4();

      if (showCloseButton === undefined) {
        showCloseButton = true;
      }

      return html`
        <div
          tabindex="-1"
          class="dso-modal"
          role=${role}
          aria-modal="true"
          aria-labelledby=${ifDefined(modalTitle && ariaId)}
        >
          <div class="dso-dialog" role="document">
            ${modalTitle && ariaId
              ? html`
                  <div class="dso-header">
                    <h2 id=${ariaId}>${modalTitle}</h2>
                    ${showCloseButton
                      ? html` <button type="button" class="dso-close">
                          <span class="sr-only">Sluiten</span>
                        </button>`
                      : nothing}
                  </div>
                `
              : nothing}
            <div class="dso-body">${body}</div>
            ${footer && html`<div class="dso-footer">${footer}</div>`}
          </div>
        </div>
      `;
    },
};
