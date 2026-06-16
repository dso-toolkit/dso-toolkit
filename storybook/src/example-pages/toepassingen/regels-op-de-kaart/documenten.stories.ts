import type { Meta } from "@storybook/web-components-vite";
import { kaartlagenTabItem, legendArgs, legendaTabItem } from "dso-toolkit";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx";

import { featuresContent } from "../../../components/document-header/document-header.content";
import { kaartlagenRichContent } from "../../../components/legend/legend.content";
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
import { openLayersMapPartial } from "./open-layers-map.partial";

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
    filterPanelOpen: {
      control: { type: "boolean" },
      table: { category: "Settings" },
    },
    mainPanelOpen: {
      control: { type: "boolean" },
      table: { category: "Settings" },
    },
    legendOpen: {
      control: { type: "boolean" },
      table: { category: "Settings" },
    },
  },
  args: {
    preferredImplementation: "core",
    print: false,
    filterPanelOpen: true,
    mainPanelOpen: true,
    legendOpen: true,
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
        legendTemplate,
        mapMessageTemplate,
        navbarTemplate,
        plekinfoCardTemplate,
        searchBarTemplate,
        selectableTemplate,
        viewerGridTemplate,
      } = templates;

      return (print: boolean, filterPanelOpen: boolean, mainPanelOpen: boolean, legendOpen: boolean) => html`
        <style>
          .demo-container {
            display: flex;
            flex-direction: column;
            block-size: 100vh;
          }

          .demo-main {
            flex: 1;
            min-block-size: 0;
            overflow-y: hidden;
          }

          .demo-main > dso-viewer-grid [slot="map"] {
            block-size: 100%;
            position: relative;
            background: url("images/kaart.png") center / cover no-repeat;
          }

          dso-viewer-grid[print] [slot="map"] {
            min-block-size: 400px;
          }

          .demo-main > dso-viewer-grid {
            block-size: 100%;
          }

          .demo-main.print > dso-viewer-grid {
            block-size: auto;
          }

          .demo-container.print {
            block-size: auto;
          }

          .demo-main.print {
            overflow-y: visible;
          }

          dso-viewer-grid[print] .dso-print-hidden {
            display: none;
          }

          dso-viewer-grid[print] [slot="legend"] dso-legend {
            --_dso-legend-content-max-block-size: none;
          }

          .demo-main > dso-viewer-grid [slot="map"] dso-map-message {
            position: absolute;
            z-index: 2;
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
          : html`<style>
              body {
                overflow: hidden !important;
              }
            </style>`}
        <div class="demo-container ${print ? "print" : ""}">
          ${headerPartial(templates, header)}

          <main class="demo-main ${print ? "print" : ""}">
            ${viewerGridTemplate({
              filterPanelOpen,
              filterPanelTitle: "Filter op kenmerken",
              mainPanelExpanded: true,
              mainPanelHidden: print ? false : !mainPanelOpen,
              mainSize: "medium",
              documentPanelOpen: true,
              documentPanelSize: "small",
              print,
              filterPanel: html`
                ${searchBarTemplate({
                  id: "filter-zoek-kenmerk",
                  label: "Zoek kenmerken",
                  placeholder: "Zoek een kenmerk",
                  icon: true,
                  buttonLabel: "Zoeken",
                  hideSearchButton: true,
                })}
                <h4>Vanuit bestemmingsplannen</h4>
                ${accordionTemplate({
                  variant: "compact",
                  sections: [
                    { handleTitle: "Bestemmingen (2)", heading: "h5", open: false, content: html`` },
                    { handleTitle: "Gebiedsaanduidingen (3)", heading: "h5", open: false, content: html`` },
                  ],
                })}
                <h4>Vanuit omgevingsdocumenten</h4>
                ${accordionTemplate({
                  variant: "compact",
                  sections: [
                    { handleTitle: "Thema's (12)", heading: "h5", open: false, content: html`` },
                    { handleTitle: "Gebiedsaanwijzingen (35)", heading: "h5", open: false, content: html`` },
                    { handleTitle: "Activiteiten (119)", heading: "h5", open: false, content: html`` },
                  ],
                })}
              `,
              topBar: bannerTemplate({
                status: "info",
                content: html`U bekijkt nu de informatie die op 05-02-2024 zichtbaar was.
                ${linkTemplate({ url: "#", label: "Terug naar vandaag" })}`,
              }),
              main: html`
                <div class="dso-print-hidden">
                  ${buttonTemplate({
                    label: "Opnieuw zoeken",
                    type: "button",
                    variant: "tertiary",
                    icon: { icon: "chevron-left" },
                  })}
                </div>
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
                ${openLayersMapPartial()}
              `,
              legend: legendOpen
                ? legendTemplate({
                    tabItems: [legendaTabItem, { ...kaartlagenTabItem, active: true }],
                    content: kaartlagenRichContent(legendArgs),
                    dsoContentSwitch: () => {},
                    dsoClose: () => {},
                  })
                : undefined,
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
    (args, buildContent) =>
      buildContent(
        args.print ?? false,
        args.filterPanelOpen ?? true,
        args.mainPanelOpen ?? true,
        args.legendOpen ?? true,
      ),
  ),
};

export { Documenten };
