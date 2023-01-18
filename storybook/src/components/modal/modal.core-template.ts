import { Modal } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreModal: ComponentImplementation<Modal<TemplateResult>> = {
  component: "modal",
  implementation: "core",
  template: () =>
    function modalTemplate({ modalTitle, role, showCloseButton, initialFocus, body, footer, dsoClose }) {
      return html`
        <dso-modal
          role=${role}
          modal-title=${ifDefined(modalTitle)}
          show-close-button=${ifDefined(showCloseButton)}
          initial-focus=${ifDefined(initialFocus)}
          @dsoClose=${dsoClose}
        >
          <div slot="body">${body}</div>
          ${footer && html`<div slot="footer">${footer}</div>`}
        </dso-modal>
      `;
    },
};
