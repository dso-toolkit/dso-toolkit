import { DsoModalCloseEvent } from "@dso-toolkit/core";
import { Modal } from "dso-toolkit";
import * as React from "react";

import { DsoModal } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactModal: ComponentImplementation<Modal<JSX.Element>> = {
  component: "modal",
  implementation: "react",
  template: () =>
    function modalTemplate({
      fullscreen,
      modalTitle,
      role,
      showCloseButton,
      initialFocus,
      body,
      footer,
      dsoClose,
      returnFocus,
    }) {
      return (
        <DsoModal
          fullscreen={fullscreen}
          role={role}
          modalTitle={modalTitle}
          showCloseButton={showCloseButton ?? true}
          initialFocus={initialFocus}
          returnFocus={returnFocus}
          onDsoClose={(e: CustomEvent<DsoModalCloseEvent>) => dsoClose?.(e)}
        >
          <div slot="body">{body}</div>
          {footer && <div slot="footer">{footer}</div>}
        </DsoModal>
      );
    },
};
