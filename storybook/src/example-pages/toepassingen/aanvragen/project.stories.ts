import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { alertTemplate } from "../../../components/alert/alert.template.js";
import { applicationHeadingTemplate } from "../../../components/application-heading/application-heading.template.js";
import { formTemplate } from "../../../components/form/form.template.js";
import { formButtonsTemplate } from "../../../components/form-buttons/form-buttons.template.js";
import { linkTemplate } from "../../../components/link/link.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

import { form } from "./project.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Aanvragen/Project",
};

export default meta;

const Project = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({ ...header, mainMenu: mainMenu("Aanvragen") })}
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
      ${footerPartial()}
    </div>
  `;
});

export { Project };
