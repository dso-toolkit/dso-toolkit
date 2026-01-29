import type { Meta } from "@storybook/web-components-vite";
import { HighlightBoxColor } from "dso-toolkit";
import { html } from "lit-html";

import { featuresContent } from "../../../components/document-header/document-header.content";
import { examplePageStories } from "../../../example-page-stories";
import { headerPartial } from "../../partials/header";

import {
  advancedSelect,
  documentCardList,
  documentPanelSubmenu,
  header,
  mainSubmenu,
  plekinfoCardsListActiviteiten,
  plekinfoCardsListLocaties,
} from "./documenten.content";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Regels op de kaart/Documenten",
};

export default meta;

const Documenten = examplePageStories((templates) => {
  const {
    accordionTemplate,
    linkTemplate,
    bannerTemplate,
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
  } = templates;

  return html`
    <style>
      .demo-container {
        display: flex;
        flex-direction: column;
        block-size: 100vh;
      }

      .demo-main {
        overflow-y: hidden;
      }

      .demo-main > dso-viewer-grid {
        block-size: 100%;
      }
    </style>
    <div class="demo-container">
      ${headerPartial(templates, header)}

      <main class="demo-main">
        ${viewerGridTemplate({
          filterPanelOpen: false,
          mainPanelExpanded: true,
          mainSize: "medium",
          documentPanelOpen: true,
          documentPanelSize: "medium",
          topBar: bannerTemplate({
            status: "info",
            content: html`U bekijkt nu de informatie die op 05-02-2024 zichtbaar was.
            ${linkTemplate({ url: "#", label: "Terug naar vandaag" })}`,
          }),
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
                color: HighlightBoxColor.grey,
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
              ${documentCardList.map((documentCardItem) => {
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
              featuresContent: featuresContent(templates),
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
              color: HighlightBoxColor.grey,
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
                    ${linkTemplate({ url: "#", label: "Toon alle activiteiten" })}
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
    </div>
  `;
});

export { Documenten };
