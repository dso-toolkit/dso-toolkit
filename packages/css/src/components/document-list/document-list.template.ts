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
      <div class="dso-document-list-item-heading">
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
      <div class="dso-document-list-item-content">
        <p>Er zijn regels gemaakt die in de toekomst geldig worden op deze locatie:</p>
        ${anchorTemplate({
          url: "#",
          label: "Toekomstige regels tonen",
        })}
        <hr />
        <small>Gevonden in: Hoofdstuk 2 Functietoedeling / Afdeling wonen</small>
        <ul class="dso-link-list">
          <li>
            ${anchorTemplate({
              url: "#",
              label: "22.1 Functieomschrijving",
            })}
          </li>
          <li>
            ${anchorTemplate({
              url: "#",
              label: "22.2 Bouwregels",
            })}
          </li>
          <li>
            ${anchorTemplate({
              url: "#",
              label: "22.3 Nadere eisen",
            })}
          </li>
          <li>
            ${anchorTemplate({
              url: "#",
              label: "22.4 Ontheffing van de bouwregels",
            })}
          </li>
        </ul>
        <hr />
        <small>Gevonden in: Hoofdstuk 2 Functietoedeling / Artikel 23 Watergang</small>
        <ul class="dso-link-list">
          <li>
            ${anchorTemplate({
              url: "#",
              label: "23.1 Functieomschrijving",
            })}
          </li>
          <li>
            ${anchorTemplate({
              url: "#",
              label: "23.2 Regels voor doorgangbeperking",
            })}
          </li>
        </ul>
      </div>
    </div>
  `;
}
