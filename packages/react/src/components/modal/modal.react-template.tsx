import { Modal } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoModal } from "../..";
import { ComponentImplementation } from "../../templates";
import { DemoHtml } from "../../utils/demo-html";

export const reactModal: ComponentImplementation<Modal> = {
  component: "modal",
  implementation: "react",
  template: () =>
    function modalTemplate({ modalTitle, role, body, footer, dsoClose }) {
      return (
        <DsoModal role={role} modalTitle={modalTitle} hasFooter={!!footer} onDsoClose={dsoClose}>
          <div slot="body">{<DemoHtml html={body} />}</div>
          <div slot="footer">{<DemoHtml html={footer} />}</div>
        </DsoModal>
      );
    },
};
