import { html, nothing, TemplateResult } from 'lit-html';

import { DocumentHeader } from '@dso-toolkit/sources';
import { buttonTemplate } from '../button/button.template';
import { definitionListTemplate } from '../definition-list/definition-list.template';

export function documentHeaderTemplate({
  title,
  type,
  owner,
  features,
  featureAction,
  featuresOpen,
  status,
  statusContentOpen,
  statusContent
}: DocumentHeader<TemplateResult>) {
  return html`
    <dso-responsive-element class="dso-document-header">
      <h1>${title}</h1>

      <div class="dso-document-header-container">
        <p class="dso-document-header-type">${type}</p>
        <p class="dso-document-header-owner">${owner}</p>

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
              icon: featuresOpen ? 'angle-up' : 'angle-down',
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
