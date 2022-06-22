import { AlertType } from "@dso-toolkit/sources";
import { ViewerGridDocumentHeaderProperties } from "@dso-toolkit/sources";
import { html, nothing } from "lit-html";

import { alertTemplate } from "../../alert/alert.template";
import { anchorTemplate } from "../../anchor/anchor.template";
import { badgeTemplate } from "../../badge/badge.template";
import { buttonTemplate } from "../../button/button.template";
import { definitionListTemplate } from "../../definition-list/definition-list.template";
import { iconTemplate } from "../../icon/icon.template";
import { labelTemplate } from "../../label/label.template";
import { viewerGridTemplate } from "../templates/viewer-grid.template";

export function viewerGridDocumentHeaderExampleTemplate({
  documentHeaderFeaturesOpen,
  documentHeaderFeatureAction,
  documentHeaderStatusOpen
}: ViewerGridDocumentHeaderProperties) {
  const features = {
    modifier: "dso-document-header-features",
    definitions: [
      {
        term: "Opschrift",
        descriptions: [
          {
            content: "Besluit van 3 juli 2018, houdende regels over activiteiten in de fysieke leefomgeving"
          },
        ],
      },
      {
        term: "Identificatie",
        descriptions: [
          {
            content: "/akn/nl/act/mnre1034/2021/BWBR0041330"
          }
        ],
      },
      {
        term: "Besluit",
        descriptions: [
          {
            content: anchorTemplate({
              label: "Bekijk besluit",
              url: "#",
              icon: {
                icon: "external-link",
              },
              iconMode: "after",
            })
          }
        ],
      },
    ],
    useSrOnlyColon: false,
  }

  return viewerGridTemplate({
    main: html`
      <div class="dso-document-header">
        <h1>Omgevingsplan gemeente Gouda</h1>

         <div class="dso-document-header-container">
           <p class="dso-document-header-type">Een omgevingsplan waar de omgeving mooier van wordt</p>
           <p class="dso-document-header-owner">Gemeente Gouda</p>

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
               ariaExpanded: documentHeaderFeaturesOpen,
               onClick: documentHeaderFeatureAction,
               label: documentHeaderFeaturesOpen ? "Minder kenmerken" : "Meer kenmerken",
               variant: null,
               modifier: "dso-document-header-toggle-features",
               icon: {
                 icon: documentHeaderFeaturesOpen ? "angle-up" : "angle-down",
               },
               iconMode: "after",
             })}
             ${documentHeaderFeaturesOpen ? definitionListTemplate(features) : nothing}
           </div>

           <div class="dso-document-header-status-wrapper">
             <p class="dso-document-header-status">
              Gepubliceerd 03-03-2021
              ${labelTemplate({
                status: "bright",
                label: "in werking",
              })}
              ${buttonTemplate({
                  ariaExpanded: documentHeaderStatusOpen,
                  onClick: documentHeaderFeatureAction,
                  label: "overige versies",
                  variant: null,
                  modifier: "dso-document-header-toggle-status",
                  icon: {
                    icon: documentHeaderStatusOpen ? "angle-up" : "angle-down",
                  },
                  iconMode: "after",
                })}
              ${badgeTemplate({
                status: "warning",
                message: "3",
              })}
              ${badgeTemplate({
                status: "outline",
                message: "1",
              })}
            </p>
            ${ documentHeaderStatusOpen ? html`
              <div class="dso-document-header-status-content">
                <h2>Versies</h2>

                <h3>Vastgesteld</h3>
                <div>
                  ${iconTemplate({ icon: 'eye' })}
                  <strong>Gepubliceerd op 01-03-2021</strong>
                  ${labelTemplate({
                    label: "In werking",
                  })}
                </div>
                <div>
                  ${iconTemplate({ icon: 'chevron-right' })}
                  Gepubliceerd op 10-03-2021
                  ${labelTemplate({
                    status: "bright",
                    label: "Toekomstige versie",
                  })}
                  datum in werking: 1-6-2022
                </div>
                ${anchorTemplate({ label: 'bekijk eerdere versies', url: '#' })}

                <h3>Ontwerpen binnen inzagetermijn</h3>
                <div>
                  ${iconTemplate({ icon: 'chevron-right' })}
                  Gepubliceerd op 09-02-2021
                  ${labelTemplate({
                    status: "warning",
                    label: "Ontwerp",
                  })}
                  Eind inzagetermijn: 23-03-2022
                </div>
                <div>
                  ${iconTemplate({ icon: 'chevron-right' })}
                  Gepubliceerd op 01-02-2021
                  ${labelTemplate({
                    status: "warning",
                    label: "Ontwerp",
                  })}
                  Eind inzagetermijn: 15-03-2022
                </div>
                <div>
                  ${iconTemplate({ icon: 'chevron-right' })}
                  Gepubliceerd op 20-01-2021
                  ${labelTemplate({
                    status: "warning",
                    label: "Ontwerp",
                  })}
                  Eind inzagetermijn: 03-03-2022
                </div>
                ${anchorTemplate({ label: 'bekijk ontwerpen waarvan inzagetermijn voorbij is', url: '#' })}
              </div>
             ` : nothing
             }
           </div>
         </div>
       </div>
    `,
    map: alertTemplate({ message: 'Dit is de kaart', status: AlertType.Info })
  });
};
