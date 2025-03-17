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
  advancedSelect,
  features,
} from "./documenten-VDK.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Regels op de kaart",
  "Documenten VDK",
  (
    {
      accordionTemplate,
      anchorTemplate,
      buttonTemplate,
      documentCardTemplate,
      documentHeaderTemplate,
      highlightBoxTemplate,
      iconTemplate,
      mapControlsTemplate,
      navbarTemplate,
      plekinfoCardTemplate,
      selectableTemplate,
      viewerGridTemplate,
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
            ${highlightBoxTemplate({
              content: html`<h2 style="margin-block-start: 0; color: #8b4a6a;">
                Laan van Westenenk 701, 7334 DP Apeldoorn
              </h2>`,
            })}
          </section>
          ${buttonTemplate({
            label: "Verberg documenten op gekozen locatie",
            type: "button",
            variant: "tertiary",
            icon: { icon: "chevron-up" },
          })}
          ${navbarTemplate(mainSubmenu)}
          <ul class="dso-card-list">
            ${cardList.map((documentCardItem) => {
              return html`<li>${documentCardTemplate(documentCardItem)}</li>`;
            })}
          </ul>
        `,
        map: html`
          <img src="images/kaart.png" aria-hidden="true" />
          ${mapControlsTemplate({ baseLayers: [], open: false, overlays: [] })}
        `,
        documentPanel: html`
          ${documentHeaderTemplate({
            title: "Omgevingsplan gemeente Gouda",
            type: "Omgevingsplan - Gemeente Gouda",
            owner: "",
            features,
            advancedSelect,
          })}
          ${navbarTemplate(documentPanelSubmenu)}
          ${highlightBoxTemplate({
            content: selectableTemplate({
              type: "checkbox",
              id: "waarde1",
              value: "compacte weergave",
              label: "Compact weergave",
              name: "weergave",
            }),
          })}
          ${accordionTemplate({
            variant: "compact-black",
            reverseAlign: true,
            sections: [
              {
                handleTitle: "Activiteiten(90)",
                heading: "h4",
                open: true,
                content: html`
                  ${plekinfoCardsListActiviteiten.map((plekinfoCard) => {
                    return html`${plekinfoCardTemplate({
                        ...plekinfoCard,
                        symbool: iconTemplate({ icon: "house" }),
                      })}
                      <hr />`;
                  })}
                  ${anchorTemplate({ url: "#", label: "Toon alle activiteiten" })}
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
                      symbool: iconTemplate({ icon: "house" }),
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
