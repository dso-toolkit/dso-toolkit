import { Modal } from "dso-toolkit";
import { DsoModalCustomEvent, ModalCloseEvent } from "@dso-toolkit/core";
import * as React from "react";

import { DsoModal } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactModal: ComponentImplementation<Modal<JSX.Element>> = {
  component: "modal",
  implementation: "react",
  template: () =>
    function modalTemplate({ fullscreen, modalTitle, role, showCloseButton, body, footer, dsoClose }) {
      return (
        <DsoModal
          fullscreen={fullscreen}
          dialogRole={role}
          modalTitle={modalTitle}
          showCloseButton={showCloseButton}
          onDsoClose={(e: DsoModalCustomEvent<ModalCloseEvent>) => dsoClose?.(e)}
        >
          <div slot="body">{body}</div>
          {footer && <div slot="footer">{footer}</div>}
        </DsoModal>
      );
    },
};
