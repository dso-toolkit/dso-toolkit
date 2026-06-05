import type { Meta } from "@storybook/web-components-vite";
import { html, nothing } from "lit-html";
import { compiler } from "markdown-to-jsx";

import { featuresContent } from "../../../components/document-header/document-header.content";
import { templateContainer } from "../../../templates";
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

const Documenten = {
  argTypes: {
    preferredImplementation: {
      options: templateContainer.getImplementationTypes(),
      control: { type: "select" },
      table: { category: "Settings" },
    },
    print: {
      control: { type: "boolean" },
      table: { category: "Settings" },
    },
  },
  args: {
    preferredImplementation: "core",
    print: false,
  },
  parameters: { layout: "fullscreen", docs: { page: () => compiler("") } },
  render: templateContainer.render(
    (templates) => {
      const {
        accordionTemplate,
        linkTemplate,
        bannerTemplate,
        buttonTemplate,
        cardContainerTemplate,
        documentHeaderTemplate,
        highlightBoxTemplate,
        iconTemplate,
        mapControlsTemplate,
        mapMessageTemplate,
        navbarTemplate,
        plekinfoCardTemplate,
        selectableTemplate,
        viewerGridTemplate,
      } = templates;

      return (print: boolean) => html`
        <style>
          .demo-container {
            display: flex;
            flex-direction: column;
            block-size: 100vh;
          }

          .demo-container.demo-print {
            block-size: auto;
          }

          .demo-main {
            overflow-y: hidden;
          }

          .demo-main.demo-print {
            overflow-y: visible;
          }

          .demo-main > dso-viewer-grid {
            block-size: 100%;
          }

          .demo-main.demo-print > dso-viewer-grid {
            block-size: auto;
          }

          .demo-container.demo-print > header {
            display: none;
          }

          dso-viewer-grid[print] .dso-print-hidden {
            display: none;
          }

          .demo-main > dso-viewer-grid [slot="map"] {
            position: relative;
          }

          .demo-main > dso-viewer-grid [slot="map"] dso-map-message {
            position: absolute;
            top: 16px; /* Align with top of Map Control Buttons and Sizing Button of Main Panel Viewer Grid */
            left: calc(40px + 32px); /* Width of Sizing Button of Main Panel Viewer Grid + margin */
            right: calc(
              16px + 40px + 16px + 132px + 32px
            ); /* Width of Map Control Buttons and it's margin + width of Kaartlagen Button + margin */
          }
        </style>
        ${print
          ? html`<style>
              body {
                position: static !important;
                overflow: auto !important;
                block-size: auto !important;
              }
            </style>`
          : nothing}
        <div class="demo-container ${print ? "demo-print" : ""}">
          ${headerPartial(templates, header)}

          <main class="demo-main ${print ? "demo-print" : ""}">
            ${viewerGridTemplate({
              filterPanelOpen: false,
              mainPanelExpanded: true,
              mainPanelHidden: false,
              mainSize: "medium",
              documentPanelOpen: true,
              documentPanelSize: "small",
              print,
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
                  })}
                </section>
                ${buttonTemplate({
                  label: "Verberg documenten op gekozen locatie",
                  type: "button",
                  variant: "tertiary",
                  icon: { icon: "chevron-up" },
                })}
                ${navbarTemplate(mainSubmenu)} ${cardContainerTemplate({ mode: "list", cards: documentCardList })}
              `,
              map: html`
                <div class="dso-print-hidden">
                  ${mapMessageTemplate({
                    variant: "success",
                    message: "Valt alles wat u wilt weten binnen het getekende gebied?",
                    buttons: [
                      {
                        label: "Ongedaan maken",
                        icon: { icon: "undo" },
                        variant: "secondary",
                        type: "button",
                        modifier: "dso-extra-small",
                        iconMode: "after",
                      },
                      {
                        label: "Volgende",
                        icon: { icon: "chevron-right" },
                        variant: "primary",
                        type: "button",
                        modifier: "dso-extra-small",
                        iconMode: "after",
                      },
                    ],
                  })}
                </div>
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
                              symbool: iconTemplate({ icon: "home" }),
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
                            symbool: iconTemplate({ icon: "home" }),
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
    },
    (args, buildContent) => buildContent(args.print ?? false),
  ),
};

export { Documenten };
