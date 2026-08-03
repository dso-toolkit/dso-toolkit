import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { listTemplate } from "../../../components/list/list.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Aanvragen/Voortgang",
};

export default meta;

const Voortgang = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({ ...header, mainMenu: mainMenu("Aanvragen") })}
      <main>
        <h1>Bezig met verzenden...</h1>
        <h2>Object Laan van Eik en Duinen 125, 's-Gravenhage</h2>
        <hr />
        <h3>Verzoek 1: Object Laan van Eik en Duinen 125, 's-Gravenhage 1</h3>
        ${listTemplate({
          modifier: "img-list",
          spaced: true,
          items: [
            { text: "Vragen en antwoorden verstuurd.", icon: { icon: "status-success" } },
            { text: "Bezig met versturen van documenten.", icon: { icon: "spinner" } },
            { text: "Documenten indienen.", icon: { icon: "clock-outline" } },
          ],
        })}
        <hr />
        <h3>Verzoek 2: Object Laan van Eik en Duinen 125, 's-Gravenhage 2</h3>
        ${listTemplate({
          modifier: "img-list",
          spaced: true,
          items: [
            { text: "Vragen en antwoorden verstuurd.", icon: { icon: "status-success" } },
            { text: "Bezig met versturen van documenten.", icon: { icon: "spinner" } },
            { text: "Documenten indienen.", icon: { icon: "clock-outline" } },
          ],
        })}
        <hr />
      </main>
      ${footerPartial()}
    </div>
  `;
});

export { Voortgang };
