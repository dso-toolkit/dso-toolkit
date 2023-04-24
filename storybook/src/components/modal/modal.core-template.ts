import { DsoModalController } from "@dso-toolkit/core";
import { Modal } from "dso-toolkit";
import { html, TemplateResult, render } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreModal: ComponentImplementation<Modal<TemplateResult>> = {
  component: "modal",
  implementation: "core",
  template: () =>
    function modalTemplate({ modalTitle, role, showCloseButton, initialFocus, body, footer, dsoClose }) {
      const open = () => {
        const controller = new DsoModalController();

        const bodyElement = document.createDocumentFragment();
        const footerElement = document.createDocumentFragment();

        render(body, bodyElement);
        render(footer, footerElement);

        const modalRef = controller.open(
          {
            title: modalTitle,
            body: bodyElement,
            footer: footerElement.childElementCount ? footerElement : undefined,
          },
          { role, showCloseButton, initialFocus }
        );

        if (dsoClose) {
          modalRef.addEventListener("dsoClose", dsoClose as EventListenerOrEventListenerObject);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any)["modalRef"] = modalRef;
      };

      open();

      return html``;
    },
};
