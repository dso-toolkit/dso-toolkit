import { Modal } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreModal: ComponentImplementation<Modal<TemplateResult>> = {
  component: "modal",
  implementation: "core",
  template: () =>
    function modalTemplate({ fullscreen, modalTitle, role, closable, body, footer, dsoClose }) {
      return html`
        <dso-modal
          dialog-role=${role}
          modal-title=${ifDefined(modalTitle)}
          ?closable=${closable}
          ?fullscreen=${fullscreen}
          @dsoClose=${dsoClose}
        >
          <div slot="body">${body}</div>
          ${footer ? html`<div slot="footer">${footer}</div>` : nothing}
        </dso-modal>
      `;
    },
};
