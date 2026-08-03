import { html } from "lit-html";

import { AttachmentsCounter } from "./attachments-counter.models.js";

export function attachmentsCounterTemplate({ count }: AttachmentsCounter) {
  return html`<dso-attachments-counter count=${count}></dso-attachments-counter>`;
}
