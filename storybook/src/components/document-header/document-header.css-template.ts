import { html, nothing, TemplateResult } from "lit-html";

import { DocumentHeader } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const cssDocumentHeader: ComponentImplementation<DocumentHeader<TemplateResult>> = {
  component: "documentHeader",
  implementation: "html-css",
  template: ({ buttonTemplate, definitionListTemplate }) =>
    function documentHeaderTemplate({
      title,
      type,
      owner,
      features,
      featureAction,
      featuresOpen,
      advancedSelect,
      sticky,
    }) {
      return html`
        <dso-responsive-element class="dso-document-header ${classMap({ "dso-document-header-sticky": !!sticky })}">
          <h1>
            <button type="button">
              <span>${title}</span>
            </button>
          </h1>

          <div class="dso-document-header-container">
            <div class="dso-document-header-owner-wrapper">
              <p class="dso-document-header-type">${type}</p>
              <p class="dso-document-header-owner">${owner}</p>
            </div>

            ${buttonTemplate({
              label: "Actie",
              variant: null,
              modifier: "dso-document-header-map-action",
              icon: {
                icon: "map-location",
              },
              iconMode: "only",
            })}

            <div class="dso-document-header-features-wrapper">
              ${buttonTemplate({
                ariaExpanded: !!featuresOpen,
                onClick: featureAction,
                label: featuresOpen ? "Minder kenmerken" : "Meer kenmerken",
                variant: null,
                modifier: "dso-document-header-toggle-features",
                icon: {
                  icon: featuresOpen ? "chevron-up" : "chevron-down",
                },
                iconMode: "after",
              })}
              ${featuresOpen ? definitionListTemplate(features) : nothing}
            </div>

            <dso-advanced-select
              .options=${advancedSelect.options}
              .active=${ifDefined(advancedSelect.active)}
            ></dso-advanced-select>
          </div>
        </dso-responsive-element>
      `;
    },
};
