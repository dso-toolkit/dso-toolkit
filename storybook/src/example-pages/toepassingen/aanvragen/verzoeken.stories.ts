import type { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";

import { alerts } from "./verzoeken.content";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Aanvragen/Verzoeken",
};

export default meta;

const Verzoeken = examplePageStories((templates) => {
  const { applicationHeadingTemplate, alertTemplate, formTemplate } = templates;

  return html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Aanvragen") })}
      <main>
        <form class="form-horizontal">
          ${applicationHeadingTemplate({
            title: "Aanvraag Laan van Eik en Duinen 125, Den Haag",
            subtitle: "7. Verzoeken indienen",
            step: "Stap 7/7",
          })}
          ${alerts.map((alert) => alertTemplate(alert))}
          ${formTemplate({
            mode: "horizontal",
            content: [
              {
                title: "Verzoek 1",
                formGroups: [
                  {
                    group: "input",
                    type: "text",
                    label: "Verzoek 1:",
                    id: "verzoeken-form-1",
                    value: "Object Laan van Eik en Duinen 125, 's-Gravenhage 1",
                  },
                  {
                    group: "select",
                    id: "verzoeken-form-2",
                    label: "Indienen bij:",
                    items: [
                      {
                        label: "",
                        options: [
                          { label: "Hoogheemraadschap van Delfland", value: "delfland" },
                          { label: "Gemeente Den Haag", value: "denhaag" },
                        ],
                      },
                    ],
                  },
                  {
                    group: "static",
                    id: "verzoeken-form-3",
                    label: "Soort:",
                    value: "Aanvraag vergunning",
                  },
                  {
                    group: "static",
                    id: "verzoeken-form-4",
                    label: "Bevat:",
                    value: "Milieubelastende activiteit - Vergunning (Gemeente)",
                  },
                ],
              },
              {
                title: "Verzoek 2",
                formGroups: [
                  {
                    group: "static",
                    id: "verzoeken-form-5",
                    label: "Verzoek 2:",
                    value: "Object Laan van Eik en Duinen 125, 's-Gravenhage 1",
                    edit: true,
                  },
                  {
                    group: "select",
                    id: "verzoeken-form-6",
                    label: "Indienen bij:",
                    items: [
                      {
                        label: "",
                        options: [
                          { label: "Gemeente Den Haag", value: "denhaag" },
                          { label: "Hoogheemraadschap van Delfland", value: "delfland" },
                        ],
                      },
                    ],
                  },
                  {
                    group: "static",
                    id: "verzoeken-form-7",
                    label: "Soort:",
                    value: "Melding",
                  },
                  {
                    group: "static",
                    id: "verzoeken-form-8",
                    label: "Bevat:",
                    value: "Milieubelastende activiteit - Vergunning (Gemeente)",
                  },
                ],
              },
            ],
            formButtons: {
              buttons: [
                {
                  type: "button",
                  variant: "primary",
                  label: "Volgende",
                  icon: { icon: "chevron-right" },
                  iconMode: "after",
                },
              ],
              asideButtons: [{ type: "button", variant: "tertiary", label: "Vorige", icon: { icon: "chevron-left" } }],
            },
          })}
        </form>
        ${footerPartial(templates)}
      </main>
    </div>
  `;
});

export { Verzoeken };
