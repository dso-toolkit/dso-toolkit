import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { definitionListTemplate } from "../../../components/definition-list/definition-list.template.js";
import { examplePageStory } from "../../../example-page-story.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { headerPartial } from "../../partials/header.js";

import { definitionList } from "./subtitle.content.js";

const meta: Meta = {
  title: "Patronen/Subtitel/Subtitel voor een Definitie Lijst",
};

export default meta;

const SubtitelVoorEenDefinitieLijst = examplePageStory(() => {
  return html`
    <div class="container">
      ${headerPartial({ ...header, mainMenu: mainMenu("Home") })}

      <main>
        <h1>Stelselcatalogus Omgevingswet</h1>
        <p role="doc-subtitle">Subtitel</p>
        ${definitionListTemplate(definitionList)}
      </main>
    </div>
  `;
});

export { SubtitelVoorEenDefinitieLijst };
