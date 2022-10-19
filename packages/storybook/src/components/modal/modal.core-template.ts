import { Modal } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";

export const coreModal: ComponentImplementation<Modal> = {
  component: "modal",
  implementation: "core",
  template: () =>
    function modalTemplate({ modalTitle, role, body, footer, dsoClose }) {
      return html`
        <dso-modal role=${role} modal-title=${ifDefined(modalTitle)} has-footer=${!!footer} @dsoClose=${dsoClose}>
          <div slot="body">${unsafeHTML(body)}</div>
          <div slot="footer">${unsafeHTML(footer)}</div>
        </dso-modal>
      `;
    },
};
