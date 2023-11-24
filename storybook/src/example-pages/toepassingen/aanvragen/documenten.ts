import { html } from "lit-html";
import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Toepassingen/Aanvragen",
  "Documenten",
  ({
    accordionTemplate,
    applicationHeadingTemplate,
    buttonTemplate,
    formButtonsTemplate,
    formGroupFilesTemplate,
    richContentTemplate,
  }) => html`
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
                  ${richContentTemplate({
                    children: html`
                      <p>
                        Een plattegrond is een schematische tekening van een horizontale doorsnede van het bouwwerk van
                        bovenaf gezien.<br />
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
                    `,
                  })}
                  ${formGroupFilesTemplate({
                    id: "documenten toepassing",
                    label: "",
                    group: "files",
                    addFileButtonVariant: "primary",
                    files: [],
                    warning:
                      "U vraagt of wij een document vertrouwelijk willen behandelen. Er zal worden beoordeeld of uw vraag terecht is. U krijgt hiervan bericht.",
                  })}
                  <div class="dso-form-buttons">
                    ${buttonTemplate({
                      label: "Volgende stap",
                      type: "button",
                      variant: "secondary",
                    })}
                  </div>
                `,
              },
              {
                handleTitle: "Beschrijving grondstoffen en hulpstoffen",
                heading: "h4",
                open: false,
                content: html`
                  ${richContentTemplate({
                    children: html`
                      <p>
                        Dit is een pagina waar er al documenten zijn toegevoegd zodat je kan zien wat er gebeurt als er
                        daadwerkelijk formfiles geupload worden. Hoe het er dan uitkomt te zien.
                      </p>
                      ${buttonTemplate({
                        label: "Lees meer",
                        type: "button",
                        variant: "tertiary",
                        icon: { icon: "chevron-down" },
                      })}
                    `,
                  })}
                  ${formGroupFilesTemplate({
                    id: "documenten toepassing",
                    label: "Lijst met toegevoegde documenten",
                    group: "files",
                    addFileButtonVariant: "primary",
                    files: [
                      {
                        filename: "waterplan.pdf",
                      },
                      {
                        filename: "Erfgrens dispuut.docx",
                        confidential: true,
                      },
                    ],
                    warning:
                      "U vraagt of wij een document vertrouwelijk willen behandelen. Er zal worden beoordeeld of uw vraag terecht is. U krijgt hiervan bericht.",
                  })}
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
  `,
);
