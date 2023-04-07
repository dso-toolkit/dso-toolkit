import { DsoModalController, ModalContent, ModalContentComponent, ModalOptions } from "dso-toolkit";
import * as React from "react";
import ReactDOM from "react-dom";

import { DsoModal } from "../../components";

export class ReactModalContentComponent implements ModalContentComponent<JSX.Element> {
  private modalRef = React.createRef<HTMLDsoModalElement>();

  private eventListeners: Record<string, () => void> = {};

  component: JSX.Element;

  constructor(Modal: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDsoModalElement>>) {
    this.component = <Modal ref={this.modalRef} />;
  }

  open() {
    ReactDOM.render(
      ReactDOM.createPortal(this.component, document.body),
      document.body.appendChild(document.createDocumentFragment())
    );

    Object.entries(this.eventListeners).forEach(([key, value]) => {
      this.modalRef.current?.addEventListener(key, value);
    });
  }

  close() {
    Object.entries(this.eventListeners).forEach(([key, value]) => {
      this.modalRef.current?.removeEventListener(key, value);
    });

    document.body.lastChild?.remove();
  }

  addEventListener(eventName: string, fn: () => void): void {
    this.modalRef.current?.addEventListener(eventName, fn);
    this.eventListeners[eventName] = fn;
  }

  removeEventListener(eventName: string, fn: () => void): void {
    this.modalRef.current?.removeEventListener(eventName, fn);
    delete this.eventListeners[eventName];
  }
}

export class ModalController implements DsoModalController<JSX.Element> {
  createInstance(content: ModalContent<JSX.Element>, options?: ModalOptions): ReactModalContentComponent {
    return useModal(content, options);
  }
}

export function useModal(
  { title, body, footer }: ModalContent<JSX.Element>,
  options?: ModalOptions
): ReactModalContentComponent {
  const Modal = React.forwardRef<HTMLDsoModalElement>((_props, ref) => (
    <DsoModal
      role={options?.role}
      modalTitle={title}
      showCloseButton={options?.showCloseButton ?? true}
      initialFocus={options?.initialFocus}
      ref={ref}
    >
      <div slot="body">{body}</div>
      {footer && <div slot="footer">{footer}</div>}
    </DsoModal>
  ));

  return new ReactModalContentComponent(Modal);
}
