import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

import { form } from "./project.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Project",
  ({ applicationHeadingTemplate, alertTemplate, formTemplate, formButtonsTemplate, linkTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Aanvragen") })}
      <main>
        ${applicationHeadingTemplate({ title: "Aanvragen", subtitle: "1. Project", step: "Stap 1/7" })}
        ${alertTemplate({
          status: "info",
          message: html`Hulp nodig bij kiezen? Doe dan eerst de
          ${linkTemplate({ label: "Vergunningscheck", url: "#" })}.`,
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
