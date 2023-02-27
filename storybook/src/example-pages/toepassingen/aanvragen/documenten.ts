import { html } from "lit-html";
import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Toepassingen/Aanvragen",
  "documenten",
  ({ applicationHeadingTemplate, formButtonsTemplate, accordionTemplate, buttonTemplate }) => html`
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
      <main>
        <form>
          ${applicationHeadingTemplate({
            title: "Aanvraag Laan van Eik en Duinen 125, Den Haag",
            subtitle: "5. Documenten",
            step: "Stap 5/7",
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
                content: html`
                  <fieldset>
                    <legend class="sr-only">Documenten</legend>
                    <div class="form-group dso-files">
                      <div class="dso-rich-content">
                        <p>
                          Een plattegrond is een schematische tekening van een horizontale doorsnede van het bouwwerk
                          van bovenaf gezien.<br />
                          Hieronder staat een voor deze vraag een niet relevante afbeelding tbv de test.
                          <img src="https://image.ibb.co/g1dKZf/019.jpg" alt="Afbeelding 19" /><br />
                          Een doorsnede is een schematische tekening van een aanzicht van een dwarsdoorsnede van het
                          bouwwerk
                        </p>
                      </div>
                      ${buttonTemplate({
                        label: "Lees meer",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "chevron-down" },
                      })}
                      <div class="dso-field-container">
                        <div class="dso-file-upload">
                          <div class="dso-button-row">
                            <input type="file" aria-errormessage="mijn-id-error-text" id="" />
                            <label class="dso-primary" for="{ mijn-id }">
                              <svg class="di di-plus">
                                <use href="dso-toolkit/dist/dso-icons.svg#plus"></use>
                              </svg>
                              <span>Document toevoegen</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      ${formButtonsTemplate({
                        buttons: [{ label: "Volgende", type: "button", variant: "secondary" }],
                      })}
                    </div>
                  </fieldset>
                `,
              },
              {
                handleTitle: "Beschrijving grondstoffen en hulpstoffen",
                heading: "h4",
                open: false,
              },
              {
                handleTitle: "Energiegebruik en maatregelen",
                heading: "h4",
                open: false,
              },
              {
                handleTitle: "Emissies, maatregelen en technieken",
                heading: "h4",
                open: false,
              },
              {
                handleTitle: "Beschrijving toestand van de lokatie",
                heading: "h4",
                open: false,
              },
              {
                handleTitle: "Afvalstoffen",
                heading: "h4",
                open: false,
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
