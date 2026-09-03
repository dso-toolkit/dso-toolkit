import type { Meta } from "@storybook/web-components-vite";
import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

import { accordionTemplate } from "../../../components/accordion/accordion.template.js";
import { bannerTemplate } from "../../../components/banner/banner.template.js";
import { buttonTemplate } from "../../../components/button/button.template.js";
import { cardContainerTemplate } from "../../../components/card-container/card-container.template.js";
import { featuresContent } from "../../../components/document-header/document-header.content.js";
import { documentHeaderTemplate } from "../../../components/document-header/document-header.template.js";
import { highlightBoxTemplate } from "../../../components/highlight-box/highlight-box.template.js";
import { iconTemplate } from "../../../components/icon/icon.template.js";
import { kaartlagenTabItem, legendArgs, legendaTabItem } from "../../../components/legend/legend.args.js";
import { kaartlagenRichContent } from "../../../components/legend/legend.content.js";
import { legendTemplate } from "../../../components/legend/legend.template.js";
import { linkTemplate } from "../../../components/link/link.template.js";
import { mapMessageTemplate } from "../../../components/map-message/map-message.template.js";
import { navbarTemplate } from "../../../components/navbar/navbar.template.js";
import { plekinfoCardTemplate } from "../../../components/plekinfo-card/plekinfo-card.template.js";
import { searchBarTemplate } from "../../../components/search-bar/search-bar.template.js";
import { selectableTemplate } from "../../../components/selectable/selectable.template.js";
import type { ViewerGridTab } from "../../../components/viewer-grid/viewer-grid.models.js";
import { viewerGridTemplate } from "../../../components/viewer-grid/viewer-grid.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { headerPartial } from "../../partials/header.js";

import {
  advancedSelect,
  documentCardList,
  documentPanelSubmenu,
  header,
  mainSubmenu,
  plekinfoCardsListActiviteiten,
  plekinfoCardsListLocaties,
} from "./documenten.content.js";
import { openLayersMapPartial } from "./open-layers-map.partial";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Regels op de kaart/Documenten",
};

export default meta;

const Documenten = examplePageStory<{
  print: boolean;
  filterPanelOpen: boolean;
  mainPanelOpen: boolean;
  legendOpen: boolean;
  sticky: boolean;
  activeTab: ViewerGridTab;
}>(
  ({ print, filterPanelOpen, mainPanelOpen, legendOpen, sticky, activeTab }) => {
    return html`
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

        .demo-main > dso-viewer-grid:not([print]) {
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

        dso-viewer-grid[print] [slot="map"] .demo-mc {
          display: none;
        }
      </style>
      ${
        print
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
            </style>`
      }
      <div class="demo-container ${classMap({ print })}">
        ${headerPartial(header)}

        <main class="demo-main ${classMap({ print })}">
          ${viewerGridTemplate({
            activeTab,
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
              ${
                print
                  ? nothing
                  : buttonTemplate({
                      label: "Opnieuw zoeken",
                      type: "button",
                      variant: "tertiary",
                      icon: { icon: "chevron-left" },
                    })
              }
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
              ${
                print
                  ? nothing
                  : mapMessageTemplate({
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
                    })
              }
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
                featuresContent,
                advancedSelect,
                sticky,
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
  {
    argTypes: {
      print: {
        control: { type: "boolean" },
        table: { category: "Viewer Grid" },
      },
      filterPanelOpen: {
        control: { type: "boolean" },
        table: { category: "Viewer Grid" },
      },
      mainPanelOpen: {
        control: { type: "boolean" },
        table: { category: "Viewer Grid" },
      },
      legendOpen: {
        control: { type: "boolean" },
        table: { category: "Legend" },
      },
      sticky: {
        control: { type: "boolean" },
        table: { category: "Document Header" },
      },
      activeTab: {
        options: [undefined, "search", "map", "document"],
        control: {
          type: "select",
        },
        table: { category: "Viewer Grid" },
      },
    },
    args: {
      print: false,
      filterPanelOpen: true,
      mainPanelOpen: true,
      legendOpen: true,
      sticky: false,
      activeTab: "document",
    },
  },
);

export { Documenten };
