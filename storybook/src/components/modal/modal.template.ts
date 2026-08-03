import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Modal } from "./modal.models.js";

export function modalTemplate({
  fullscreen,
  modalTitle,
  role,
  closable,
  body,
  footer,
  dsoClose,
}: Modal<TemplateResult>) {
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
}
