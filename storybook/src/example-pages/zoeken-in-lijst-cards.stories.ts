import type { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import { examplePageStories } from "../example-page-stories";

import { header } from "./content/header.content";
import { footerPartial } from "./partials/footer";
import { headerPartial } from "./partials/header";
import { cardList } from "./zoeken-in-lijst-cards.content";

const meta: Meta = {
  title: "Voorbeeldpagina's/Zoeken in lijst cards",
};

export default meta;

const ZoekenInLijstCards = examplePageStories((templates) => {
  const {
    applicationHeadingTemplate,
    searchBarTemplate,
    badgeTemplate,
    cardListTemplate,
    footnoteTemplate,
    footnotesTemplate,
    formTemplate,
  } = templates;

  return html`
    <div class="container">
      ${headerPartial(templates, {
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
              ${cardListTemplate(cardList)}
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
      ${footerPartial(templates)}
    </div>
  `;
});

export { ZoekenInLijstCards };
