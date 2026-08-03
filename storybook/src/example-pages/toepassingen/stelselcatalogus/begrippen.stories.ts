import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { buttonRowTemplate } from "../../../components/button-row/button-row.template.js";
import { definitionListTemplate } from "../../../components/definition-list/definition-list.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { footerPartial } from "../../partials/footer.js";
import { headerPartial } from "../../partials/header.js";

import { definitions1, definitions2, definitions3, definitions4, definitions5, mainMenu } from "./begrippen.content.js";

const meta: Meta = {
  title: "Voorbeeldpagina's/Toepassingen/Stelselcatalogus/Begrippen",
};

export default meta;

const Begrippen = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({ ...header, mainMenu })}

      <main>
        <h1>Aanlegplaats</h1>
        <p role="doc-subtitle">Begrip uit het Omgevingsloket</p>

        <h2>Algemeen</h2>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions1() })}
        ${buttonRowTemplate({
          buttons: [
            {
              label: "Bekijk minder details",
              variant: "secondary",
              type: "button",
              icon: { icon: "chevron-up" },
              ariaExpanded: false,
            },
          ],
        })}

        <h3>Unieke identificatie</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions2() })}

        <h3>Relaties binnen AQUO begrippenkader</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions3() })}

        <h3>Relaties buiten AQUO begrippenkader</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions4() })}

        <h3>Technisch</h3>
        ${definitionListTemplate({ modifier: "dso-bordered", definitions: definitions5() })}
      </main>
      ${footerPartial()}
    </div>
  `;
});

export { Begrippen };
