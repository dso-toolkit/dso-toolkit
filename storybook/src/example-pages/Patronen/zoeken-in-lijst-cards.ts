import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";
import { footerPartial } from "../partials/footer";
import { headerPartial } from "../partials/header";
import { header } from "../partials/header.content";
import { cardList } from "./zoeken-in-lijst-cards.content";

examplePageFactory(
  "Patronen",
  "Zoeken in lijst cards",
  (
    {
      applicationHeadingTemplate,
      searchBarTemplate,
      badgeTemplate,
      cardListTemplate,
      footnoteTemplate,
      footnotesTemplate,
      formTemplate,
    },
    templates
  ) => html`
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est
            laborum.${footnoteTemplate({
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
                formGroups: [
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
                        label: html`${badgeTemplate({ message: "Niet geldige oude wetgeving", status: "danger" })}`,
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
  `
);
