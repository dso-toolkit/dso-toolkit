import type { Meta } from "@storybook/web-components";
import { html } from "lit-html";

import { examplePageStories } from "../../../example-page-stories";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { headerPartial } from "../../partials/header";

import { definitionList } from "./subtitle.content";

const meta: Meta = {
  title: "Patronen/Subtitel/Subtitel voor een Definitie Lijst",
};

export default meta;

const SubtitelVoorEenDefinitieLijst = examplePageStories((templates) => {
  const { definitionListTemplate } = templates;

  return html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Home") })}

      <main>
        <h1>Stelselcatalogus Omgevingswet</h1>
        <p role="doc-subtitle">Subtitel</p>
        ${definitionListTemplate(definitionList)}
      </main>
    </div>
  `;
});

export { SubtitelVoorEenDefinitieLijst };
