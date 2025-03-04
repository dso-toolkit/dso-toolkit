import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { form } from "./project.content";
import { mainMenu } from "./main-menu.content";
import { headerPartial } from "../../partials/header";
import { footerPartial } from "../../partials/footer";
import { header } from "../../partials/header.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Project",
  ({ applicationHeadingTemplate, alertTemplate, formTemplate, formButtonsTemplate, anchorTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu })}
      <main>
        ${applicationHeadingTemplate({ title: "Aanvragen", subtitle: "1. Project", step: "Stap 1/7" })}
        ${alertTemplate({
          status: "info",
          message: html`Hulp nodig bij kiezen? Doe dan eerst de
          ${anchorTemplate({ label: "Vergunningscheck", url: "#" })}.`,
        })}
        ${formTemplate(form)}
        ${formButtonsTemplate({
          buttons: [
            {
              label: "Volgende stap",
              variant: "primary",
              type: "submit",
              icon: { icon: "chevron-right" },
              iconMode: "after",
            },
          ],
        })}
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);
