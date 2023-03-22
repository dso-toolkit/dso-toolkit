import { html } from "lit-html";
import { examplePageFactory } from "../../../example-page-factory";
import { radios, checkboxes } from "./vragen.content";

examplePageFactory(
  "Toepassingen/Aanvragen",
  "Vragen",
  (
    {
      applicationHeadingTemplate,
      formButtonsTemplate,
      accordionTemplate,
      formGroupRadiosTemplate,
      formGroupCheckboxesTemplate,
      formGroupInputTemplate,
      buttonTemplate,
    },
    templates
  ) => html`
    <div class="container">
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
                status: "0 van 5 vragen beantwoord",
                content: html`
                  <fieldset>
                    <legend class="sr-only">Vragenlijst</legend>
                    ${formGroupRadiosTemplate(radios(templates))} ${formGroupCheckboxesTemplate(checkboxes)}
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
                status: "2 van 3 vragen beantwoord",
                state: "danger",
              },
              {
                handleTitle: "Energiegebruik en maatregelen",
                heading: "h4",
                open: false,
                status: "0 van 3 vragen beantwoord",
              },
              {
                handleTitle: "Emissies, maatregelen en technieken",
                heading: "h4",
                open: false,
                status: "0 van 3 vragen beantwoord",
              },
              {
                handleTitle: "Beschrijving toestand van de lokatie",
                heading: "h4",
                open: false,
                status: "0 van 3 vragen beantwoord",
              },
              {
                handleTitle: "Afvalstoffen",
                heading: "h4",
                open: false,
                status: "0 van 3 vragen beantwoord",
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
      </main>
    </div>
  `
);
