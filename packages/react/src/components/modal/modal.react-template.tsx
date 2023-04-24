import { DsoModalCloseEvent } from "@dso-toolkit/core";
import { Modal } from "dso-toolkit";
import * as React from "react";

import { DsoModal } from "../../components";
import { ComponentImplementation } from "../../templates";
import { DsoModalPortal } from "../../react-components/modal-portal.component";

export const reactModal: ComponentImplementation<Modal<JSX.Element>> = {
  component: "modal",
  implementation: "react",
  template: () =>
    function modalTemplate({ modalTitle, role, showCloseButton, initialFocus, body, footer, dsoClose }) {
      return (
        <DsoModalPortal>
          <DsoModal
            role={role}
            modalTitle={modalTitle}
            showCloseButton={showCloseButton ?? true}
            initialFocus={initialFocus}
            onDsoClose={(e: CustomEvent<DsoModalCloseEvent>) => dsoClose?.(e)}
          >
            <div slot="body">{body}</div>
            {footer && <div slot="footer">{footer}</div>}
          </DsoModal>
        </DsoModalPortal>
      );
    },
};
