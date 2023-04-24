import { ModalContent, ModalOptions } from "dso-toolkit";

import { DsoModalRef } from "./modal-ref";

export type AllowedModalContentTypes = HTMLElement | DocumentFragment | string;

export class DsoModalController {
  open(modal: ModalContent<AllowedModalContentTypes>, options?: ModalOptions): DsoModalRef {
    const dsoModalElement = this.createModal(modal, options);

    document.body.appendChild(dsoModalElement);

    return new DsoModalRef(dsoModalElement);
  }

  private createModal(
    { title, body, footer }: ModalContent<AllowedModalContentTypes>,
    options?: ModalOptions
  ): HTMLElement {
    const element = document.createElement(`dso-modal`);

    if (title) {
      element.modalTitle = title;
    }

    if (options) {
      const { role, showCloseButton, initialFocus } = options;

      if (role) {
        element.role = role;
      }

      if (showCloseButton) {
        element.showCloseButton = showCloseButton;
      }

      if (initialFocus) {
        element.initialFocus = initialFocus;
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
