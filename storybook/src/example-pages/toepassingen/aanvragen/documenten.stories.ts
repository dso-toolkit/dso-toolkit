import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { accordionTemplate } from "../../../components/accordion/accordion.template.js";
import { applicationHeadingTemplate } from "../../../components/application-heading/application-heading.template.js";
import { buttonTemplate } from "../../../components/button/button.template.js";
import { formButtonsTemplate } from "../../../components/form-buttons/form-buttons.template.js";
import { formGroupFilesTemplate } from "../../../components/form-group/form-group-files.template.js";
import { richContentTemplate } from "../../../components/rich-content/rich-content.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Aanvragen/Documenten",
};

export default meta;

const Documenten = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({ ...header, mainMenu: mainMenu("Aanvragen") })}
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
                        <img src="images/019.jpg" alt="Afbeelding 19" /><br />
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
        ${footerPartial()}
      </main>
    </div>
  `;
});

export { Documenten };
