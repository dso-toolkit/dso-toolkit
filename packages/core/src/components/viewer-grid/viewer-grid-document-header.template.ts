import { ViewerGridDocumentHeader } from "@dso-toolkit/sources";
import { html, nothing, TemplateResult } from "lit-html";

import { buttonTemplate } from "../button/button.template";
import { definitionListTemplate } from "../definition-list/definition-list.template";

export function viewerGridDocumentHeaderTemplate({
  title,
  type,
  features,
  featuresAction,
  mapAction,
  featuresOpen,
  owner,
  status,
}: ViewerGridDocumentHeader<TemplateResult>) {
  return html`
    <div class="dso-document-header">
      ${title}

      <div class="dso-document-header-container">
        <p class="dso-document-header-type">${type}</p>
        <p class="dso-document-header-owner">${owner}</p>
        <p class="dso-document-header-status">${status}</p>

        ${buttonTemplate({
          onClick: mapAction,
          label: "Actie",
          variant: null,
          modifier: "dso-document-header-map-action",
          icon: {
            icon: "map-location",
          },
          iconMode: "only",
        })}
        ${buttonTemplate({
          ariaExpanded: featuresOpen,
          onClick: featuresAction,
          label: featuresOpen ? "Minder kenmerken" : "Meer kenmerken",
          variant: null,
          modifier: "dso-document-header-toggle-features",
          icon: {
            icon: featuresOpen ? "angle-up" : "angle-down",
          },
          iconMode: "after",
        })}
      </div>
      ${featuresOpen ? definitionListTemplate(features) : nothing}
    </div>
  `;
}
