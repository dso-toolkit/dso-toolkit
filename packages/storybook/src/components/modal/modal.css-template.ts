import { Modal } from "@dso-toolkit/sources";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { v4 } from "uuid";

import { ComponentImplementation } from "../../templates";

export const cssModal: ComponentImplementation<Modal> = {
  component: "modal",
  implementation: "css",
  template: () =>
    function modalTemplate({ modalTitle, role, body, footer }) {
      const ariaId = v4();

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
                    <button type="button" class="dso-close">
                      <span class="sr-only">Sluiten</span>
                    </button>
                  </div>
                `
              : nothing}
            <div class="dso-body">${unsafeHTML(body)}</div>
            ${footer && html` <div class="dso-footer">${unsafeHTML(footer)}</div> `}
          </div>
        </div>
      `;
    },
};
