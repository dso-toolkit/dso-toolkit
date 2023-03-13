import { DsoModalController, ModalContent, ModalContentComponent, ModalOptions } from "dso-toolkit";
import * as React from "react";
import ReactDOM from "react-dom";

import { DsoModal } from "../../components";

export class ReactModalContentComponent implements ModalContentComponent<JSX.Element> {
  private modalRef?: HTMLElement;

  component: JSX.Element;

  constructor(component: JSX.Element, modalRef: HTMLElement | null) {
    this.component = component;
    this.modalRef = modalRef ?? undefined;
  }

  open() {
    ReactDOM.render(
      ReactDOM.createPortal(this.component, document.body),
      document.body.appendChild(document.createDocumentFragment())
    );
  }

  close() {
    document.body.lastChild?.remove();
  }

  addEventListener(eventName: string, fn: () => void): void {
    this.modalRef?.addEventListener(eventName, fn);
  }

  removeEventListener(eventName: string, fn: () => void): void {
    this.modalRef?.addEventListener(eventName, fn);
  }
}

export class ModalController implements DsoModalController<JSX.Element> {
  createInstance(content: ModalContent<JSX.Element>, options?: ModalOptions) {
    return useModal(content, options);
  }
}

export function useModal({ title, body, footer }: ModalContent<JSX.Element>, options?: ModalOptions) {
  const modalRef = React.useRef<HTMLDsoModalElement | null>(null);

  const element = (
    <DsoModal
      role={options?.role}
      modalTitle={title}
      showCloseButton={options?.showCloseButton ?? true}
      initialFocus={options?.initialFocus}
      ref={modalRef}
    >
      <div slot="body">{body}</div>
      {footer && <div slot="footer">{footer}</div>}
    </DsoModal>
  );

  return new ReactModalContentComponent(element, modalRef.current);
}
