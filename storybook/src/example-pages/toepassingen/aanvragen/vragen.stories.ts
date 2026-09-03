import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { accordionTemplate } from "../../../components/accordion/accordion.template.js";
import { applicationHeadingTemplate } from "../../../components/application-heading/application-heading.template.js";
import { buttonTemplate } from "../../../components/button/button.template.js";
import { formButtonsTemplate } from "../../../components/form-buttons/form-buttons.template.js";
import { formGroupCheckboxesTemplate } from "../../../components/form-group/form-group-checkboxes.template.js";
import { formGroupInputTemplate } from "../../../components/form-group/form-group-input.template.js";
import { formGroupRadiosTemplate } from "../../../components/form-group/form-group-radios.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

import { checkboxes, radios } from "./vragen.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Aanvragen/Vragen",
};

export default meta;

const Vragen = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({ ...header, mainMenu: mainMenu("Aanvragen") })}
      <main>
        <form class="form-horizontal">
          ${applicationHeadingTemplate({
            title: "Aanvraag Laan van Eik en Duinen 125, Den Haag",
            subtitle: "4. Vragen",
            step: "Stap 4/7",
          })}
          <h3>Mileubelastende activiteit - Vergunning (Gemeente)</h3>
          ${accordionTemplate({
            variant: "default",
            reverseAlign: false,
            sections: [
              {
                handleTitle: "Veehouderij",
                heading: "h4",
                open: true,
                statusDescription: "0 van 5 vragen beantwoord",
                content: html`
                  <fieldset>
                    <legend class="sr-only">Vragenlijst</legend>
                    ${formGroupRadiosTemplate(radios())} ${formGroupCheckboxesTemplate(checkboxes)}
                    ${formGroupInputTemplate({
                      group: "input",
                      id: "vraag 3",
                      type: "text",
                      label: "Vul hier uw antwoord in",
                      value: "Placeholder ",
                      required: true,
                    })}
                  </fieldset>
                  <div class="dso-form-buttons">
                    ${buttonTemplate({
                      label: "Volgende stap",
                      type: "button",
                      variant: "primary",
                    })}
                  </div>
                `,
              },
              {
                handleTitle: "Beschrijving grondstoffen en hulpstoffen",
                heading: "h4",
                open: false,
                statusDescription: "2 van 3 vragen beantwoord",
                status: "danger",
              },
              {
                handleTitle: "Energiegebruik en maatregelen",
                heading: "h4",
                open: false,
                statusDescription: "0 van 3 vragen beantwoord",
              },
              {
                handleTitle: "Emissies, maatregelen en technieken",
                heading: "h4",
                open: false,
                statusDescription: "0 van 3 vragen beantwoord",
              },
              {
                handleTitle: "Beschrijving toestand van de lokatie",
                heading: "h4",
                open: false,
                statusDescription: "0 van 3 vragen beantwoord",
              },
              {
                handleTitle: "Afvalstoffen",
                heading: "h4",
                open: false,
                statusDescription: "0 van 3 vragen beantwoord",
              },
            ],
          })}
          ${formButtonsTemplate({
            asideButtons: [
              { label: "Vorige stap", type: "button", variant: "tertiary", icon: { icon: "chevron-left" } },
            ],
            buttons: [
              {
                label: "Volgende stap",
                type: "submit",
                variant: "secondary",
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

export { Vragen };
