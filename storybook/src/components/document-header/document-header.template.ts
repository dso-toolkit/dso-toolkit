import { TemplateResult, html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { advancedSelectTemplate } from "../advanced-select/advanced-select.template.js";
import { buttonTemplate } from "../button/button.template.js";
import { definitionListTemplate } from "../definition-list/definition-list.template.js";
import { headingTemplate } from "../heading/heading.template.js";

import { DocumentHeader } from "./document-header.models.js";

export function documentHeaderTemplate({
  title,
  type,
  owner,
  featuresContent,
  featureAction,
  featuresOpen,
  advancedSelect,
  sticky,
  statusMessage,
  variant,
}: DocumentHeader<TemplateResult>) {
  const variantFeaturesContent = featuresContent.get(variant ? variant : "vastgesteld");
  const features = variantFeaturesContent?.get("features");
  const besluitInformatie = variantFeaturesContent?.get("besluitinformatie");

  return html`
    <dso-responsive-element
      class="dso-document-header ${classMap({
        "dso-document-header-sticky": !!sticky,
        [`dso-variant-${variant}`]: !!variant,
      })}"
    >
      ${
        statusMessage && !!variant
          ? html`<div class="dso-document-header-status">
              ${variant === "ontwerp" ? html`<dso-icon icon="document-pencil"></dso-icon>` : nothing}
              ${variant === "besluitversie" ? html`<dso-icon icon="hammer"></dso-icon>` : nothing} ${statusMessage}
            </div>`
          : nothing
      }
      <h1>
        <button type="button">
          <span>${title}</span>
        </button>
      </h1>

      <div class="dso-document-header-container">
        <div class="dso-document-header-owner-wrapper">
          <p class="dso-document-header-type">${type}</p>
          - ${owner ? html`<p class="dso-document-header-owner">${owner}</p>` : nothing}
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
          ${
            featuresOpen
              ? html`
                  ${features ? definitionListTemplate(features) : nothing}
                  ${
                    besluitInformatie
                      ? html`
                          ${headingTemplate({
                            level: 3,
                            children: "Besluitinformatie",
                          })}
                          ${definitionListTemplate(besluitInformatie)}
                        `
                      : nothing
                  }
                `
              : nothing
          }
        </div>

        ${advancedSelectTemplate(advancedSelect)}
      </div>
    </dso-responsive-element>
  `;
}
