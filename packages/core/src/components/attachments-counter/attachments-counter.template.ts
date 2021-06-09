import { AttachmentsCounter } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function attachmentsCounterTemplate({ count }: AttachmentsCounter) {
  return html`
    <dso-attachments-counter count=${count}></dso-attachments-counter>
  `;
}
