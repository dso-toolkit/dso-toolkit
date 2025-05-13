import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { headerPartial } from "../../partials/header";
import { header, tabItems } from "./documenten-VDK.content";
import { dropdownItems } from "../aanvragen/locatie.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Regels op de kaart",
  "Documenten VDK zoeken",
  (
    { buttonTemplate, dropdownMenuTemplate, mapControlsTemplate, searchBarTemplate, viewerGridTemplate, tabsTemplate },
    templates,
  ) => html`
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
          mode: "vdk",
          mainPanelExpanded: true,
          mainSize: "medium",
          main: html` <div style="margin-block-start: 1rem">
              ${buttonTemplate({
                label: "Terug",
                type: "button",
                variant: "tertiary",
                icon: { icon: "chevron-left" },
              })}
            </div>
            <h1>Zoeken</h1>
            ${tabsTemplate({
              items: tabItems,
              content: html`
                <p>U kunt zoeken naar een adres, coördinaten of een gebied op de kaart.</p>

                <div class="dso-context-wrapper">
                  <span class="dso-context-label">
                    <label>Adres</label>
                  </span>
                  <div class="dso-context-container">
                    ${dropdownMenuTemplate({
                      button: { variant: "tertiary", label: "Meer zoekopties" },
                      id: "locatie--dropdownmenu",
                      groups: dropdownItems,
                    })}
                  </div>
                </div>
                ${searchBarTemplate({
                  buttonLabel: "Zoeken",
                  id: "filter_activiteiten",
                  hideSearchButton: true,
                  placeholder: "Adres of perceel",
                  icon: true,
                })}
                ${buttonTemplate({
                  variant: "tertiary",
                  label: "Kies datum in het verleden",
                  icon: { icon: "chevron-right" },
                  iconMode: "after",
                })}
                <div style="margin-block-start: 1rem">
                  ${buttonTemplate({
                    variant: "primary",
                    label: "Zoeken",
                  })}
                </div>
              `,
            })}`,
          map: html`
            <img src="images/kaart.png" aria-hidden="true" alt="" />
            ${mapControlsTemplate({ baseLayers: [], open: false, overlays: [] })}
          `,
        })}
      </main>
    </div>
  `,
);
