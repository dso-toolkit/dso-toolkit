import { DsoModalController, Modal, ModalContentComponent } from "dso-toolkit";
import * as React from "react";
import ReactDOM from "react-dom";

import { DsoModal } from "../../components";

import type { DsoModalCloseEvent } from "@dso-toolkit/core";

export class ReactModalContentComponent implements ModalContentComponent<JSX.Element> {
  component: JSX.Element;

  constructor(component: JSX.Element) {
    this.component = component;
  }

  open() {
    ReactDOM.render(this.component, document.body.appendChild(document.createElement("div")));
  }

  close() {
    document.body.lastChild?.remove();
  }
}

export class ModalController implements DsoModalController<JSX.Element> {
  getInstance(component: JSX.Element): ReactModalContentComponent {
    return new ReactModalContentComponent(component);
  }

  create({
    modalTitle,
    body,
    footer,
    role,
    showCloseButton,
    initialFocus,
    dsoClose,
  }: Modal<JSX.Element>): ReactModalContentComponent {
    const element = (
      <DsoModal
        role={role}
        modalTitle={modalTitle}
        showCloseButton={showCloseButton}
        initialFocus={initialFocus}
        onDsoClose={(e: CustomEvent<DsoModalCloseEvent>) => dsoClose?.(e)}
      >
        <div slot="body">{body}</div>
        {footer && <div slot="footer">{footer}</div>}
      </DsoModal>
    );

    return new ReactModalContentComponent(element);
  }
}

export function useModal(component: JSX.Element) {
  const instance = new ReactModalContentComponent(component);

  return instance;
}
