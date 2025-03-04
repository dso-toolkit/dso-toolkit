import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { headerPartial } from "../../partials/header";
import {
  header,
  cardList,
  plekinfoCardsListLocaties,
  documentPanelSubmenu,
  mainSubmenu,
  plekinfoCardsListActiviteiten,
} from "./documenten-VDK.content";

examplePageFactory(
  "Toepassingen/Regels op de kaart",
  "Documenten VDK",
  (
    {
      accordionTemplate,
      plekinfoCardTemplate,
      navbarTemplate,
      selectableTemplate,
      viewerGridTemplate,
      buttonTemplate,
      contextTemplate,
      mapControlsTemplate,
      cardListTemplate,
      iconTemplate,
      advancedSelectTemplate,
    },
    templates,
  ) => html`
    ${headerPartial(templates, header)}

    <main>
      ${viewerGridTemplate({
        mode: "vdk",
        filterpanelOpen: false,
        mainPanelExpanded: true,
        mainSize: "medium",
        documentPanelOpen: true,
        documentPanelSize: "medium",
        main: html`
          ${buttonTemplate({
            label: "Opnieuw zoeken",
            type: "button",
            variant: "tertiary",
            icon: { icon: "chevron-left" },
          })}
          <section class="dso-filterblok">
            <div class="dso-highlight-box">
              ${contextTemplate({
                type: "label",
                label: html`<h2>Laan van Westenenk 701, 7334 DP Apeldoorn</h2>`,
                content: html``,
                children: html``,
              })}
            </div>
          </section>
          ${buttonTemplate({
            label: "Verberg documenten op gekozen locatie",
            type: "button",
            variant: "tertiary",
            icon: { icon: "chevron-up" },
          })}
          ${navbarTemplate(mainSubmenu)} ${cardListTemplate(cardList)}
        `,
        map: html`
          <img src="images/kaart.png" aria-hidden="true" />
          ${mapControlsTemplate({ baseLayers: [], open: false, overlays: [] })}
        `,
        documentPanel: html`
          <div class="dso-document-header">
            <div class="dso-highlight-box">
              ${contextTemplate({
                type: "label",
                label: html`<h2>Omgevingsplan gemeente Apeldoorn</h2>`,
                content: html`${iconTemplate({ icon: "map-location" })}`,
                children: html` <p>Omgevingsplan - Gemeente Apeldoorn</p>
                  ${buttonTemplate({
                    label: "meer kenmerken",
                    type: "button",
                    variant: "tertiary",
                    iconMode: "after",
                    compact: true,
                    icon: { icon: "chevron-down" },
                  })}
                  ${advancedSelectTemplate({
                    active: { label: "In werking - Laatst gewijzigd: 01-01-2024" },
                    options: [
                      {
                        label: "Geldende versie",
                        variant: "success",
                        redirect: {
                          href: "#",
                          label: "Bekijk eerder vastgestelde versies",
                        },
                        options: [
                          {
                            label: "In werking (laatst gewijzigd: 01-01-2024)",
                          },
                        ],
                      },
                    ],
                  })}`,
              })}
            </div>
          </div>
          ${navbarTemplate(documentPanelSubmenu)}
          <div class="dso-highlight-box">
            <div class="dso-button-row dso-align-right">
              ${selectableTemplate({
                type: "checkbox",
                id: "waarde1",
                value: "compacte weergave",
                label: "Compact weergave",
                name: "weergave",
              })}
            </div>
          </div>
          ${accordionTemplate({
            variant: "compact-black",
            reverseAlign: true,
            sections: [
              {
                handleTitle: "Activiteiten(90)",
                heading: "h4",
                open: true,
                content: html`
                  ${plekinfoCardsListActiviteiten.map((plekinfoCard) =>
                    plekinfoCardTemplate({
                      ...plekinfoCard,
                      symbool: html`${iconTemplate({ icon: "house" })}`,
                    }),
                  )}
                  <a href="#">Toon alle activiteiten</a>
                `,
              },

              {
                handleTitle: "Locaties (3)",
                heading: "h4",
                open: true,
                content: html`
                  ${plekinfoCardsListLocaties.map((plekinfoCard) =>
                    plekinfoCardTemplate({
                      ...plekinfoCard,
                      symbool: html`${iconTemplate({ icon: "house" })}`,
                    }),
                  )}
                `,
              },
            ],
          })}
        `,
      })}
    </main>
  `,
);
