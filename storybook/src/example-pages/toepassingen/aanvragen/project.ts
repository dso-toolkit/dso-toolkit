import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { form } from "./project.content";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Project",
  ({ applicationHeadingTemplate, alertTemplate, formTemplate, formButtonsTemplate, anchorTemplate }) => html`
    <div class="container">
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
    </div>
  `,
);
