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
                        ${buttonTemplate({
                          label: "Lees meer",
                          type: "button",
                          variant: "tertiary",
                          icon: { icon: "chevron-down" },
                        })}
                      </div>
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
                      <div class="dso-form-buttons">
                        <button type="submit" class="dso-secondary">
                          <span> Volgende stap </span>
                          <dso-icon icon="chevron-right"></dso-icon>
                        </button>
                      </div>
                    </div>
                  </fieldset>
                `,
              },
              {
                handleTitle: "Beschrijving grondstoffen en hulpstoffen",
                heading: "h4",
                open: false,
                content: html`
                  <fieldset>
                    <legend class="sr-only">Documenten</legend>
                    <div class="form-group dso-files">
                      <div class="dso-rich-content">
                        <p>
                          Dit is een pagina waar er al documenten zijn toegevoegd zodat je kan zien wat er gebeurt als
                          er daadwerkelijk formfiles geupload worden. Hoe het er dan uitkomt te zien.
                        </p>
                        ${buttonTemplate({
                          label: "Lees meer",
                          type: "button",
                          variant: "tertiary",
                          icon: { icon: "chevron-down" },
                        })}
                      </div>
                      <div class="dso-label-container">
                        <label class="control-label" for="mijn-id"> Lijst met toegevoegde documenten </label>
                      </div>
                      <div class="dso-field-container">
                        <ul class="dso-filelist">
                          <li>
                            <div class="dso-filename" id="mijn-id-file-filename-0">Waterplan.pdf</div>
                            <div class="dso-selectable">
                              <input
                                type="checkbox"
                                id="mijn-id-file-confirm-0"
                                value=""
                                aria-describedby="mijn-id-file-filename-0"
                              />
                              <label for="mijn-id-file-confirm-0"> Vertrouwelijk </label>
                            </div>
                            <button
                              type="button"
                              class="dso-tertiary dso-remove"
                              aria-describedby="mijn-id-file-filename-0"
                            >
                              <span> Verwijder document </span>
                            </button>
                          </li>
                          <li>
                            <div class="dso-filename" id="mijn-id-file-filename-1">Erfgrens dispuut.docx</div>
                            <div class="dso-selectable">
                              <input
                                type="checkbox"
                                id="mijn-id-file-confirm-1"
                                value=""
                                aria-describedby="mijn-id-file-filename-1"
                              />
                              <label for="mijn-id-file-confirm-1"> Vertrouwelijk </label>
                            </div>
                            <svg class="di di-status-warning">
                              <use href="dso-toolkit/dist/dso-icons.svg#status-warning"></use>
                            </svg>

                            <button
                              type="button"
                              class="dso-tertiary dso-remove"
                              aria-describedby="mijn-id-file-filename-1"
                            >
                              <span> Verwijder document </span>
                            </button>
                          </li>
                        </ul>
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
                      <div class="dso-form-buttons">
                        <button type="submit" class="dso-secondary">
                          <span> Volgende stap </span>

                          <dso-icon icon="chevron-right"></dso-icon>
                        </button>
                      </div>
                    </div>
                  </fieldset>
                `,
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
