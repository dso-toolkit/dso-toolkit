import { DsoModalController, Modal, ModalContentComponent } from "dso-toolkit";

import { DsoModalCloseEvent } from "./modal.interfaces";

export class CoreModalContentComponent implements ModalContentComponent<HTMLDsoModalElement> {
  component: HTMLDsoModalElement;

  constructor(component: HTMLDsoModalElement) {
    this.component = component;
  }

  open() {
    document.body.appendChild(this.component);
  }

  close() {
    document.body.removeChild(this.component);
  }
}

export class ModalController implements DsoModalController<HTMLDsoModalElement> {
  getInstance(component: HTMLDsoModalElement): CoreModalContentComponent {
    return new CoreModalContentComponent(component);
  }

  create({
    modalTitle,
    body,
    footer,
    role,
    showCloseButton,
    initialFocus,
    dsoClose,
  }: Modal<HTMLDsoModalElement>): CoreModalContentComponent {
    const element = document.createElement(`dso-modal`);

    const attributes: { [key: string]: string | undefined } = {
      "modal-title": modalTitle,
      role,
      "show-close-button": showCloseButton !== undefined ? String(showCloseButton) : showCloseButton,
      "initial-focus": initialFocus,
    };

    for (const key in attributes) {
      const value = attributes[key];

      if (value) {
        element.setAttribute(key, value);
      }
    }

    if (dsoClose) {
      element.addEventListener("dsoClose", ((e: CustomEvent<DsoModalCloseEvent>) => dsoClose(e)) as EventListener);
    }

    element.innerHTML = `<div slot="body">${body}</div>${footer ? `<div slot="footer">${footer}</div>` : undefined}`;

    return this.getInstance(element);
  }
}
