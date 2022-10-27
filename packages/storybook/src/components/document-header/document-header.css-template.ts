import { html, nothing, TemplateResult } from 'lit-html';

import { DocumentHeader } from '@dso-toolkit/sources';
import { ComponentImplementation } from '../../templates';

export const cssDocumentHeader: ComponentImplementation<DocumentHeader<TemplateResult>> = {
  component: 'documentHeader',
  implementation: 'css',
  template: ({ buttonTemplate, definitionListTemplate }) => function documentHeaderTemplate({
    title,
    type,
    owner,
    features,
    featureAction,
    featuresOpen,
    status,
    statusContentOpen,
    statusContent
  }) {
    return html`
      <dso-responsive-element class="dso-document-header">
        <h1>${title}</h1>

        <div class="dso-document-header-container">
          <div class="dso-document-header-owner-wrapper">
            <p class="dso-document-header-type">${type}</p>
            <p class="dso-document-header-owner">${owner}</p>
          </div>

          ${buttonTemplate({
            label: 'Actie',
            variant: null,
            modifier: 'dso-document-header-map-action',
            icon: {
              icon: 'map-location',
            },
            iconMode: 'only',
          })}

          <div class="dso-document-header-features-wrapper">
            ${buttonTemplate({
              ariaExpanded: !!featuresOpen,
              onClick: featureAction,
              label: featuresOpen ? 'Minder kenmerken' : 'Meer kenmerken',
              variant: null,
              modifier: 'dso-document-header-toggle-features',
              icon: {
                icon: featuresOpen ? 'chevron-up' : 'chevron-down',
              },
              iconMode: 'after'
            })}
            ${featuresOpen ? definitionListTemplate(features) : nothing}
          </div>

          <div class="dso-document-header-status-wrapper">
            <p class="dso-document-header-status">
              ${status}
            </p>
            ${statusContentOpen && statusContent
              ? html`
                <div class="dso-document-header-status-content">
                  ${statusContent}
                </div>
              `
              : nothing
            }
          </div>
        </div>
      </dso-responsive-element>
    `;
  }

}
