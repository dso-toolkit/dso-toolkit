import { DsoModalController, ModalContent, ModalContentComponent, ModalOptions } from "dso-toolkit";

export class CoreModalContentComponent implements ModalContentComponent<HTMLElement> {
  component: HTMLElement;

  constructor(component: HTMLElement) {
    this.component = component;
  }

  open() {
    document.body.appendChild(this.component);
  }

  close() {
    document.body.removeChild(this.component);
  }

  addEventListener(eventName: "dsoClose", fn: () => void) {
    this.component.addEventListener(eventName, fn);
  }

  removeEventListener(eventName: "dsoClose", fn: () => void) {
    this.component.removeEventListener(eventName, fn);
  }
}

export class ModalController implements DsoModalController<HTMLElement> {
  createInstance(
    { title, body, footer }: ModalContent<string | HTMLElement>,
    options?: ModalOptions
  ): CoreModalContentComponent {
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

    return new CoreModalContentComponent(element);
  }
}
