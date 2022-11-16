import { Modal } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreModal: ComponentImplementation<Modal<TemplateResult>> = {
  component: "modal",
  implementation: "core",
  template: () =>
    function modalTemplate({ modalTitle, role, body, footer, dsoClose }) {
      return html`
        <dso-modal role=${role} modal-title=${ifDefined(modalTitle)} @dsoClose=${dsoClose}>
          <div slot="body">${body}</div>
          ${footer && html`<div slot="footer">${footer}</div>`}
        </dso-modal>
      `;
    },
};
