import { AttachmentsCounter } from "dso-toolkit";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const coreAttachmentsCounter: ComponentImplementation<AttachmentsCounter> = {
  component: "attachmentsCounter",
  implementation: "core",
  template: () =>
    function attachmentsCounterTemplate({ count }) {
      return html`<dso-attachments-counter count=${count}></dso-attachments-counter>`;
    },
};
