import { DocumentList, DocumentListItem } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const cssDocumentList: ComponentImplementation<DocumentList<TemplateResult>> = {
  component: 'documentList',
  implementation: 'css',
  template: ({ anchorTemplate }) => function documentListTemplate({ items }: DocumentList<TemplateResult>) {
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
              <p class="dso-document-list-item-status">
                ${status}
                ${anchorTemplate({
                  url: "#",
                  label: "Hele document bekijken",
                  modifier: "dso-document-list-item-open-document",
                })}
              </p>
            </div>
          </div>
          <div class="dso-document-list-item-content">
            <p>Hier komt vulling</p>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.</p>
          </div>
        </div>
      `;
    }

    return html`
      <dso-responsive-element>
        <ul class="dso-document-list">
          ${items.map(item => html`<li>${documentListItemTemplate(item)}</li>`)}
        </ul>
      </dso-responsive-element>
    `;
  }
}
