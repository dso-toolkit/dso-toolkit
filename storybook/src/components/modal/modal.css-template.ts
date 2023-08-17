import { Modal } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { v4 } from "uuid";

import { ComponentImplementation } from "../../templates";
import { classMap } from "lit-html/directives/class-map.js";

export const cssModal: ComponentImplementation<Modal<TemplateResult>> = {
  component: "modal",
  implementation: "html-css",
  template: () =>
    function modalTemplate({ fullscreen, modalTitle, role, showCloseButton, body, footer }) {
      const ariaId = v4();

      if (showCloseButton === undefined) {
        showCloseButton = true;
      }

      return html`
        <dialog
          class="dso-modal ${classMap({ "dso-fullscreen": !!fullscreen })}"
          role=${role}
          aria-modal="true"
          aria-labelledby=${ifDefined(modalTitle ? ariaId : undefined)}
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
            <dso-scrollable>
              <div class="dso-body" tabindex="0">${body}</div>
            </dso-scrollable>
            ${footer && html`<div class="dso-footer">${footer}</div>`}
          </div>
        </dialog>
      `;
    },
};
