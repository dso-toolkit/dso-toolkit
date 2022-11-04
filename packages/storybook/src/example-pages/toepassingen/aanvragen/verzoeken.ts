import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { alerts } from "./verzoeken.content";

examplePageFactory(
  "Toepassingen/Aanvragen",
  "Verzoeken",
  ({
    applicationHeadingTemplate,
    alertTemplate,
    formButtonsTemplate,
    formTemplate,
    formGroupInputTemplate,
    formGroupSelectTemplate,
    formGroupStaticTemplate,
  }) => html`
    <div class="container">
      <main>
        <form class="form-horizontal">
          ${applicationHeadingTemplate({
            title: "Aanvraag Laan van Eik en Duinen 125, Den Haag",
            subtitle: "7. Verzoeken indienen",
            step: "Stap 7/7",
          })}
          ${alerts.map((alert) => html` ${alertTemplate(alert)} `)}
          ${formTemplate({
            mode: "horizontal",
            formGroups: html`
              ${formButtonsTemplate({
                buttons: [{ type: "button", variant: "tertiary", label: "Ergens anders indienen" }],
              })}
              <fieldset>
                <legend>Verzoek 1</legend>
                ${formGroupInputTemplate({
                  group: "input",
                  type: "text",
                  label: "Verzoek 1",
                  id: "verzoeken-form-1",
                  value: "Object Laan van Eik en Duinen 125, 's-Gravenhage 1",
                })}
                ${formGroupSelectTemplate({
                  group: "select",
                  id: "verzoeken-form-2",
                  label: "Indienen bij:",
                  items: [
                    {
                      options: [
                        { label: "Hoogheemraadschap van Delfland", value: "delfland" },
                        { label: "Gemeente Den Haag", value: "denhaag" },
                      ],
                    },
                  ],
                })}
                ${formGroupStaticTemplate({
                  group: "static",
                  id: "verzoeken-form-3",
                  label: "Soort:",
                  value: "Aanvraag vergunning",
                })}
                ${formGroupStaticTemplate({
                  group: "static",
                  id: "verzoeken-form-4",
                  label: "Bevat:",
                  value: "Milieubelastende activiteit - Vergunning (Gemeente)",
                })}
              </fieldset>
              <fieldset>
                <legend>Verzoek 2</legend>
                ${formGroupStaticTemplate({
                  group: "static",
                  id: "verzoeken-form-5",
                  label: "Verzoek 2",
                  value: "Object Laan van Eik en Duinen 125, 's-Gravenhage 1",
                  edit: true,
                })}
                ${formGroupSelectTemplate({
                  group: "select",
                  id: "verzoeken-form-6",
                  label: "Indienen bij:",
                  items: [
                    {
                      options: [
                        { label: "Gemeente Den Haag", value: "denhaag" },
                        { label: "Hoogheemraadschap van Delfland", value: "delfland" },
                      ],
                    },
                  ],
                })}
                ${formGroupStaticTemplate({
                  group: "static",
                  id: "verzoeken-form-7",
                  label: "Soort:",
                  value: "Melding",
                })}
                ${formGroupStaticTemplate({
                  group: "static",
                  id: "verzoeken-form-8",
                  label: "Bevat:",
                  value: "Milieubelastende activiteit - Vergunning (Gemeente)",
                })}
              </fieldset>
              ${formButtonsTemplate({
                buttons: [
                  {
                    type: "button",
                    variant: "primary",
                    label: "Volgende",
                    icon: { icon: "chevron-right" },
                    iconMode: "after",
                  },
                ],
                asideButtons: [
                  { type: "button", variant: "tertiary", label: "Vorige", icon: { icon: "chevron-left" } },
                ],
              })}
            `,
          })}
        </form>
      </main>
    </div>
  `
);
