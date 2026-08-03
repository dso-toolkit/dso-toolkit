import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { applicationHeadingTemplate } from "../../../components/application-heading/application-heading.template.js";
import { definitionListTemplate } from "../../../components/definition-list/definition-list.template.js";
import { formButtonsTemplate } from "../../../components/form-buttons/form-buttons.template.js";
import { formGroupRadiosTemplate } from "../../../components/form-group/form-group-radios.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

import { definitionList1, definitionlist2, radios } from "./conceptverzoek.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Aanvragen/Conceptverzoek",
};

export default meta;

const Conceptverzoek = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({ ...header, mainMenu: mainMenu("Aanvragen") })}
      <main>
        <form>
          ${applicationHeadingTemplate({
            title: "Mijn projectnaam",
            subtitle: "7. Verzoeken indienen - doel van de verzoeken",
            step: "Stap 7/7",
          })}
          ${formGroupRadiosTemplate(radios())} ${definitionListTemplate(definitionList1)}
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
      ${footerPartial()}
    </div>
  `;
});

export { Conceptverzoek };
