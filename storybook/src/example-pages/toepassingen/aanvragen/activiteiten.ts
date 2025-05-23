import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { bestuurslaag, labels, listButtons, shoppingCart, toestemming } from "./activiteiten.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Activiteiten",
  (
    {
      applicationHeadingTemplate,
      alertTemplate,
      linkTemplate,
      shoppingCartTemplate,
      highlightBoxTemplate,
      searchBarTemplate,
      formGroupCheckboxesTemplate,
      contextTemplate,
      labelGroupTemplate,
      listButtonTemplate,
      formButtonsTemplate,
    },
    templates,
  ) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Aanvragen") })}
      <main>
        <form>
          ${applicationHeadingTemplate({
            title: "Aanvraag Laan van Eik en Duinen 125, Den Haag",
            subtitle: "3. Activiteiten",
            step: "Stap 3/7",
          })}
          ${alertTemplate({
            message: html`Hulp nodig bij kiezen? Doe dan eerst de
            ${linkTemplate({ label: "Vergunningscheck", url: "#" })}.`,
            status: "info",
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
            <div class="col-sm-3">
              <fieldset class="dso-form-group-collection">
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
            <div class="col-sm-9">
              <fieldset class="dso-form-group-collection">
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
        ${footerPartial(templates)}
      </main>
    </div>
  `,
);
