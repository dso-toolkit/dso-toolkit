import { AttachmentsCounter } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function attachmentsCounterTemplate({ count }: AttachmentsCounter) {
  return html`
    <span class="dso-attachments">
      ${count} <span class="sr-only">${count !== 1 ? 'bijlagen' : 'bijlage'}</span>
    </span>
  `;
}
