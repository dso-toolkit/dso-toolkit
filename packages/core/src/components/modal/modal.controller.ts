import { ModalContent, ModalOptions } from "dso-toolkit";

import { DsoModalRef } from "./modal-ref";

export class DsoModalController {
  open(modal: ModalContent<HTMLElement | string>, options?: ModalOptions): DsoModalRef {
    const dsoModalElement = this.createModal(modal, options);

    document.body.appendChild(dsoModalElement);

    return new DsoModalRef(dsoModalElement);
  }

  private createModal(
    { title, body, footer }: ModalContent<string | HTMLElement>,
    options?: ModalOptions
  ): HTMLElement {
    const element = document.createElement(`dso-modal`);

    // moet nog even een eigen Type krijgen.
    const attributes: { [key: string]: string | undefined } = {};

    if (title) {
      attributes["modal-title"] = title;
    }

    if (options) {
      const { role, showCloseButton, initialFocus } = options;

      if (role) {
        attributes["role"] = role;
      }

      if (showCloseButton) {
        attributes["show-close-button"] = String(showCloseButton);
      }

      if (initialFocus) {
        attributes["initial-focus"] = initialFocus;
        // element.initialFocus = "div";
        // element.showCloseButton = showCloseButton;
      }
    }

    for (const key in attributes) {
      const value = attributes[key];

      if (value) {
        element.setAttribute(key, value);
      }
    }

    const bodyDiv = document.createElement("div");

    if (typeof body === "string") {
      bodyDiv.setAttribute("slot", "body");
      bodyDiv.innerHTML = body;
    } else {
      bodyDiv.appendChild(body);
    }

    element.appendChild(bodyDiv);

    if (footer) {
      const footerDiv = document.createElement("div");

      if (typeof footer === "string") {
        footerDiv.setAttribute("slot", "footer");
        footerDiv.innerHTML = footer;
      } else {
        footerDiv.appendChild(footer);
      }

      element.appendChild(footerDiv);
    }

    return element;
  }
}
