import { ModalContent, ModalOptions } from "dso-toolkit";
import * as React from "react";
import ReactDOM from "react-dom";

import { DsoModal } from "../../components";

export class DsoModalController {
  private modalRef = React.createRef<HTMLDsoModalElement>();

  private eventListeners: Record<string, () => void> = {};

  component?: JSX.Element;

  open(modal: ModalContent<JSX.Element>, options?: ModalOptions) {
    if (this.component) {
      this.close();
    }

    this.component = this.createModal(modal, options);

    ReactDOM.render(
      ReactDOM.createPortal(this.component, document.body),
      document.body.appendChild(document.createDocumentFragment())
    );

    Object.entries(this.eventListeners).forEach(([key, value]) => {
      this.modalRef.current?.addEventListener(key, value);
    });
  }

  close() {
    if (!this.component) {
      throw new Error("component not found");
    }

    Object.entries(this.eventListeners).forEach(([key, value]) => {
      this.modalRef.current?.removeEventListener(key, value);
    });

    document.body.lastChild?.remove();
  }

  addEventListener(eventName: string, fn: () => void): void {
    if (!this.component) {
      throw new Error("unable to add event listener. try opening the modal first");
    }

    this.modalRef.current?.addEventListener(eventName, fn);
    this.eventListeners[eventName] = fn;
  }

  removeEventListener(eventName: string, fn: () => void): void {
    if (!this.component) {
      throw new Error("unable to add event listener. try opening the modal first");
    }

    this.modalRef.current?.removeEventListener(eventName, fn);
    delete this.eventListeners[eventName];
  }

  private createModal({ title, body, footer }: ModalContent<JSX.Element>, options?: ModalOptions) {
    return (
      <DsoModal
        role={options?.role}
        modalTitle={title}
        showCloseButton={options?.showCloseButton ?? true}
        initialFocus={options?.initialFocus}
        ref={this.modalRef}
      >
        <div slot="body">{body}</div>
        {footer && <div slot="footer">{footer}</div>}
      </DsoModal>
    );
  }
}
