import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { alertTemplate } from "../../../components/alert/alert.template.js";
import { applicationHeadingTemplate } from "../../../components/application-heading/application-heading.template.js";
import { formTemplate } from "../../../components/form/form.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

import { alerts } from "./verzoeken.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Aanvragen/Verzoeken",
};

export default meta;

const Verzoeken = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({ ...header, mainMenu: mainMenu("Aanvragen") })}
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
        ${footerPartial()}
      </main>
    </div>
  `;
});

export { Verzoeken };
