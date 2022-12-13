import { AlertType } from "dso-toolkit";
import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { bestuurslaag, labels, listButtons, shoppingCart, toestemming } from "./activiteiten.content";

examplePageFactory(
  "Toepassingen/Aanvragen",
  "Activiteiten",
  ({
    applicationHeadingTemplate,
    alertTemplate,
    anchorTemplate,
    shoppingCartTemplate,
    highlightBoxTemplate,
    searchBarTemplate,
    formGroupCheckboxesTemplate,
    contextTemplate,
    labelGroupTemplate,
    listButtonTemplate,
    formButtonsTemplate,
  }) => html`
    <div class="container">
      <main>
        <form>
          ${applicationHeadingTemplate({
            title: "Aanvraag Laan van Eik en Duinen 125, Den Haag",
            subtitle: "3. Activiteiten",
            step: "Stap 3/7",
          })}
          ${alertTemplate({
            message: html`Hulp nodig bij kiezen? Doe dan eerst de
            ${anchorTemplate({ label: "Vergunningscheck", url: "#" })}.`,
            status: AlertType.Info,
          })}
          ${shoppingCartTemplate(shoppingCart)}
          ${highlightBoxTemplate({
            content: html`
              ${searchBarTemplate({
                label: "Zoek uw activiteiten",
                buttonLabel: "Zoeken",
                id: "filter_activiteiten",
                hideSearchButton: true,
                placeholder: "Bijvoorbeeld bouwactiviteiten",
                icon: true,
                clearButton: true,
              })}
            `,
          })}
          <div class="row">
            <div class="col-xs-12 col-sm-3">
              <fieldset>
                <legend><h4>Filters</h4></legend>
                ${formGroupCheckboxesTemplate({
                  group: "checkboxes",
                  selectables: bestuurslaag,
                  id: "facets_1",
                  label: "Bestuurslaag",
                })}
                ${formGroupCheckboxesTemplate({
                  group: "checkboxes",
                  selectables: toestemming,
                  id: "facets_2",
                  label: "Toestemming",
                })}
              </fieldset>
            </div>
            <div class="col-xs-12 col-sm-9">
              <fieldset>
                <legend class="sr-only">
                  <h4>5 activiteiten</h4>
                </legend>
                ${contextTemplate({
                  type: "label",
                  label: html`<h4>5 activiteiten</h4>`,
                  content: html`
                    <div class="dso-context-select">
                      <label for="sorting-select">Sorteer op:</label>
                      <select id="sorting-select">
                        <option value="most-chosen">Meest gekozen</option>
                        <option value="alphabetic" selected>Alfabetisch</option>
                      </select>
                    </div>
                  `,
                  children: html`
                    <div class="row">
                      <div class="col-xs-12">
                        ${labelGroupTemplate({ labels })}
                        ${listButtons.map((listButton) => listButtonTemplate(listButton))}
                      </div>
                    </div>
                  `,
                })}
              </fieldset>
            </div>
          </div>
          ${formButtonsTemplate({
            buttons: [
              {
                type: "submit",
                variant: "primary",
                label: "Volgende stap",
                icon: { icon: "chevron-right" },
                iconMode: "after",
              },
            ],
            asideButtons: [{ label: "Vorige stap", variant: "tertiary", icon: { icon: "chevron-left" } }],
          })}
        </form>
      </main>
    </div>
  `
);
