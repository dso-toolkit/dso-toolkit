import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { applicationHeadingTemplate } from "../../../components/application-heading/application-heading.template.js";
import { dropdownMenuTemplate } from "../../../components/dropdown-menu/dropdown-menu.template.js";
import { formButtonsTemplate } from "../../../components/form-buttons/form-buttons.template.js";
import { justifyFormGroupsTemplate } from "../../../components/justify-form-groups/justify-form-groups.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

import { dropdownItems, formGroup } from "./locatie.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Aanvragen/Locatie",
};

export default meta;

const Locatie = examplePageStory(() => {
  return html`
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
      ${headerPartial({ ...header, mainMenu: mainMenu("Aanvragen") })}
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
                variant: "tertiary",
                label: "Meer zoekopties",
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
        ${footerPartial()}
      </main>
    </div>
  `;
});

export { Locatie };
