import { ModalContent } from "dso-toolkit";

export class DsoModalController {
  component?: HTMLElement;

  open(modal: ModalContent<string | HTMLElement>, options?: any) {
    if (this.component) {
      this.close();
    }
    this.component = this.createModal(modal, options);

    document.body.appendChild(this.component);
  }

  close() {
    if (!this.component) {
      throw new Error("component not found");
    }

    document.body.removeChild(this.component);
  }

  addEventListener(eventName: "dsoClose", fn: (e: any) => void) {
    if (!this.component) {
      throw new Error("unable to add event listener. try opening the modal first");
    }

    this.component.addEventListener(eventName, fn);
  }

  removeEventListener(eventName: "dsoClose", fn: (e: any) => void) {
    if (!this.component) {
      throw new Error("unable to add event listener. try opening the modal first");
    }

    this.component.removeEventListener(eventName, fn);
  }

  private createModal({ title, body, footer }: ModalContent<string | HTMLElement>, options?: any): HTMLElement {
    const element = document.createElement(`dso-modal`);

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
