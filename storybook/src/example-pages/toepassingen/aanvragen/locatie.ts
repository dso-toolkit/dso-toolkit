import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { dropdownItems, formGroup } from "./locatie.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Locatie",
  (
    { applicationHeadingTemplate, dropdownMenuTemplate, formButtonsTemplate, justifyFormGroupsTemplate },
    templates,
  ) => html`
    <style>
      .dso-map-example {
        background-image: url("/images/map-lved125.png");
        background-size: cover;
        height: 400px;
        margin: 32px 0;
        width: 100%;
      }
    </style>

    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Aanvragen") })}
      <main>
        ${applicationHeadingTemplate({
          title: "Aanvraag Laan van Eik en Duinen 125, Den Haag",
          subtitle: "2. Locatie",
          step: "Stap 2/7",
        })}
        <form>
          <div class="row">
            <div class="col-md-9">
              <h3>Coordinaten</h3>
            </div>
            <div class="col-md-3 text-right">
              ${dropdownMenuTemplate({
                button: { variant: "tertiary", label: "Meer zoekopties" },
                id: "locatie--dropdownmenu",
                groups: dropdownItems,
              })}
            </div>
          </div>
          ${justifyFormGroupsTemplate(formGroup)}
          <div class="dso-map-example"></div>
          ${formButtonsTemplate({
            asideButtons: [
              { label: "Vorige stap", type: "button", variant: "tertiary", icon: { icon: "chevron-left" } },
            ],
            buttons: [
              {
                label: "Volgende stap",
                type: "submit",
                variant: "primary",
                icon: { icon: "chevron-right" },
                iconMode: "after",
              },
            ],
          })}
        </form>
        ${footerPartial(templates)}
      </main>
    </div>
  `,
);
