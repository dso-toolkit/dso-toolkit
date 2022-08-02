import { DocumentList, DocumentListItem } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { anchorTemplate } from '../anchor/anchor.template';

export function documentListTemplate({ items }: DocumentList<TemplateResult>) {
  return html`
    <dso-responsive-element>
      <ul class="dso-document-list">
        ${items.map(item => html`<li>${documentListItemTemplate(item)}</li>`)}
      </ul>
    </dso-responsive-element>
  `;
}

function documentListItemTemplate({
  title,
  type,
  owner,
  status
}: DocumentListItem<TemplateResult>) {
  return html`
    <div class="dso-document-list-item">
      <h2>${title}</h2>
      <div class="dso-document-list-item-container">
        <p class="dso-document-list-item-type">${type}</p>
        <p class="dso-document-list-item-owner">${owner}</p>
        <p class="dso-document-list-item-status">${status}</p>
        ${anchorTemplate({
          url: "#",
          label: "Hele document bekijken",
          modifier: "dso-document-list-item-open-document",
        })}
      </div>
    </div>
  `;
}
