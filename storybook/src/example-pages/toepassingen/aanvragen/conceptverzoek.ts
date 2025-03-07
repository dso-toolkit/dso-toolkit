import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { definitionList1, definitionlist2, radios } from "./conceptverzoek.content";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";
import { footerPartial } from "../../partials/footer";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Conceptverzoek",
  (
    { applicationHeadingTemplate, definitionListTemplate, formButtonsTemplate, formGroupRadiosTemplate },
    templates,
  ) => html`
    <div class="container">
      ${headerPartial(templates, {
        ...header,
        mainMenu: [
          {
            label: "Home",
            url: "#",
          },
          {
            label: "Vergunningscheck",
            url: "#",
          },
          {
            label: "Aanvragen",
            url: "#",
            active: true,
          },
          {
            label: "Regels op de kaart",
            url: "#",
          },
          {
            label: "Mijn Omgevingsloket",
            url: "#",
          },
        ],
      })}
      <main>
        <form>
          ${applicationHeadingTemplate({
            title: "Mijn projectnaam",
            subtitle: "7. Verzoeken indienen - doel van de verzoeken",
            step: "Stap 7/7",
          })}
          ${formGroupRadiosTemplate(radios(templates))} ${definitionListTemplate(definitionList1)}
          ${definitionListTemplate(definitionlist2)}
          ${formButtonsTemplate({
            buttons: [
              {
                label: "Volgende",
                variant: "primary",
                type: "submit",
              },
            ],
            asideButtons: [{ label: "Vorige", variant: "tertiary" }],
          })}
        </form>
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);
