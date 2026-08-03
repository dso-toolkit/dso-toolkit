import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { applicationHeadingTemplate } from "../components/application-heading/application-heading.template.js";
import { badgeTemplate } from "../components/badge/badge.template.js";
import { cardContainerTemplate } from "../components/card-container/card-container.template.js";
import { footnoteTemplate } from "../components/footnotes/footnote.template.js";
import { footnotesTemplate } from "../components/footnotes/footnotes.template.js";
import { formTemplate } from "../components/form/form.template.js";
import { searchBarTemplate } from "../components/search-bar/search-bar.template.js";
import { examplePageStory } from "../example-page-story.js";

import { header } from "./content/header.content.js";
import { footerPartial } from "./partials/footer.js";
import { headerPartial } from "./partials/header.js";
import { cardContainer } from "./zoeken-in-lijst-cards.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Zoeken in lijst cards",
};

export default meta;

const ZoekenInLijstCards = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({
        ...header,
        mainMenu: [
          { label: "Regels op de kaart", url: "#" },
          { label: "Zoeken in wetgeving", url: "#", active: true },
        ],
      })}

      <main>
        <div>
          <h1>Zoeken in wetgeving</h1>
          <p>
            Gebruik deze pagina om te zoeken naar specifieke wetteksten, beleidsinformatie, of andersoortige regelgeving
            die van invloed is op uw leefomgeving.
            ${footnoteTemplate({
              number: 14,
              label: "Foreest Groen Consult (2018) Quickscan natuuronderzoek Ontwikkeling Herveld-Noord. 26 juli 2018.",
            })}
          </p>
          <div class="row">
            <div class="col-md-8">
              ${applicationHeadingTemplate({ subtitle: "Wetgeving Gemeente Den Haag" })}
              ${searchBarTemplate({
                buttonLabel: "Zoeken",
                hideSearchButton: true,
                id: "search-bar--hidden-button",
                label: "Zoeken in Lijst",
                placeholder: "Zoek op naam, datum, initiator of status",
                icon: true,
              })}
              <h5>
                Actieve filters:
                ${badgeTemplate({ message: "Omgevingswet document", status: "success" })}${badgeTemplate({
                  message: "Geldige oude wetgeving",
                  status: "warning",
                })}
              </h5>
              ${cardContainerTemplate(cardContainer)}
            </div>
            <div class="col-md-4">
              <h2 class="dso-steps-indicator">Filters</h2>
              ${formTemplate({
                content: [
                  {
                    group: "checkboxes",
                    label: "Selecteer uw gewenste filter",
                    id: "selecteer-uw-gewenste-filter",
                    selectables: [
                      {
                        type: "checkbox",
                        id: "aanhanger-0",
                        name: "aanhanger",
                        label: html`${badgeTemplate({ message: "Omgevingswet document", status: "success" })}`,
                        value: "bak",
                        checked: true,
                      },
                      {
                        type: "checkbox",
                        id: "aanhanger-1",
                        name: "aanhanger",
                        label: html`${badgeTemplate({ message: "Geldige oude wetgeving", status: "warning" })}`,
                        value: "caravan",
                        checked: true,
                      },
                      {
                        type: "checkbox",
                        id: "aanhanger-2",
                        name: "aanhanger",
                        label: html`${badgeTemplate({ message: "Niet geldige oude wetgeving", status: "error" })}`,
                        value: "fietsendrager",
                      },
                    ],
                  },
                ],
              })}
            </div>
          </div>
          ${footnotesTemplate([
            {
              label: "Foreest Groen Consult (2018) Quickscan natuuronderzoek Ontwikkeling Herveld-Noord. 26 juli 2018.",
              number: 14,
            },
          ])}
        </div>
      </main>
      ${footerPartial()}
    </div>
  `;
});

export { ZoekenInLijstCards };
