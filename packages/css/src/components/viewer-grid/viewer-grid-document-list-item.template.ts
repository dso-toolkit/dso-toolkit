import { ViewerGridDocumentListItem } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { anchorTemplate } from '../anchor/anchor.template';

export function viewerGridDocumentListItem({ title, type, owner, status }: ViewerGridDocumentListItem<TemplateResult>) {
  return html`
    <div class="dso-document-list-item">
      ${title}
      <div class="dso-document-list-item-container">
        <p class="dso-document-list-item-type">${type}</p><p class="dso-document-list-item-owner">${owner}</p>
        <p class="dso-document-list-item-status">${status}</p>
        ${anchorTemplate({
          url: '#',
          label: 'Hele document bekijken',
          modifier: 'dso-document-list-item-open-document'
        })}
      </div>
    </div>
  `;
}
