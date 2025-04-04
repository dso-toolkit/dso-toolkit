import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { definitionList1, definitionlist2, radios } from "./conceptverzoek.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Conceptverzoek",
  (
    { applicationHeadingTemplate, definitionListTemplate, formButtonsTemplate, formGroupRadiosTemplate },
    templates,
  ) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Aanvragen") })}
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
