import { AlertType } from "@dso-toolkit/sources";
import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { form } from "./project.content";

examplePageFactory(
  "Toepassingen/Aanvragen",
  "Project",
  ({ applicationHeadingTemplate, alertTemplate, formTemplate, formButtonsTemplate }) => html`
    <div class="container">
      <main>
        ${applicationHeadingTemplate({ title: "Aanvragen", subtitle: "1. Project", step: "Stap 1/7" })}
        ${alertTemplate({
          status: AlertType.Info,
          message: html`Hulp nodig bij kiezen? Doe dan eerst de <a href="#">Vergunningscheck</a>.`,
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
  `
);
