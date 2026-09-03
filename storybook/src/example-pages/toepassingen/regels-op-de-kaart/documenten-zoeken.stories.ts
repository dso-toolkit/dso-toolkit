import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { buttonTemplate } from "../../../components/button/button.template.js";
import { dropdownMenuTemplate } from "../../../components/dropdown-menu/dropdown-menu.template.js";
import { mapControlsTemplate } from "../../../components/map-controls/map-controls.template.js";
import { onboardingTipTemplate } from "../../../components/onboarding-tip/onboarding-tip.template.js";
import { richContentTemplate } from "../../../components/rich-content/rich-content.template.js";
import { searchBarTemplate } from "../../../components/search-bar/search-bar.template.js";
import { tabsTemplate } from "../../../components/tabs/tabs.template.js";
import { viewerGridTemplate } from "../../../components/viewer-grid/viewer-grid.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { headerPartial } from "../../partials/header.js";
import { dropdownItems } from "../aanvragen/locatie.content.js";

import { header, tabItems } from "./documenten.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Regels op de kaart/Documenten zoeken",
};

export default meta;

const DocumentenZoeken = examplePageStory(() => {
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
      ${headerPartial(header)}

      <main class="demo-main">
        ${viewerGridTemplate({
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
                      variant: "tertiary",
                      label: "Meer zoekopties",
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
                    ariaDescribedby: "onboarding-tip",
                  })}
                  ${onboardingTipTemplate({
                    id: "onboarding-tip",
                    placement: "bottom",
                    content: richContentTemplate({ children: html`<p>Klik hier om te gaan zoeken.</p>` }),
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
  `;
});

export { DocumentenZoeken };
