import { ModalContent, ModalOptions } from "./modal.interfaces";

import { DsoModalRef } from "./modal-ref";

export class DsoModalController {
  open(modal: ModalContent, options?: ModalOptions): DsoModalRef {
    const dsoModalElement = this.createModal(modal, options);

    document.body.appendChild(dsoModalElement);

    return new DsoModalRef(dsoModalElement);
  }

  private createModal({ title, body, footer }: ModalContent, options?: ModalOptions): HTMLElement {
    const element = document.createElement(`dso-modal`);

    if (title) {
      element.setAttribute("modal-title", title);
    }

    if (options) {
      const { role, showCloseButton, initialFocus } = options;

      if (role) {
        element.role = role;
      }

      if (showCloseButton) {
        element.setAttribute("show-close-button", showCloseButton ? "true" : "false");
      }

      if (initialFocus) {
        element.setAttribute("initial-focus", initialFocus);
      }
    }

    const bodyDiv = document.createElement("div");
    bodyDiv.setAttribute("slot", "body");

    if (typeof body === "string") {
      bodyDiv.innerHTML = body;
    } else {
      bodyDiv.appendChild(body);
    }

    element.appendChild(bodyDiv);

    if (footer) {
      const footerDiv = document.createElement("div");
      footerDiv.setAttribute("slot", "footer");

      if (typeof footer === "string") {
        footerDiv.innerHTML = footer;
      } else {
        footerDiv.appendChild(footer);
      }

      element.appendChild(footerDiv);
    }

    return element;
  }
}
