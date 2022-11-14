import { Modal } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoModal } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactModal: ComponentImplementation<Modal<JSX.Element>> = {
  component: "modal",
  implementation: "react",
  template: () =>
    function modalTemplate({ modalTitle, role, body, footer, dsoClose }) {
      return (
        <DsoModal role={role} modalTitle={modalTitle} onDsoClose={dsoClose}>
          <div slot="body">{body}</div>
          {footer && <div slot="footer">{footer}</div>}
        </DsoModal>
      );
    },
};
