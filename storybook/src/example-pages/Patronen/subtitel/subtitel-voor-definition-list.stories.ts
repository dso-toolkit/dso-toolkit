import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { definitionListTemplate } from "../../../components/definition-list/definition-list.template.js";
import { examplePageMeta } from "../../../example-page-meta.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { headerPartial } from "../../partials/header.js";

import { definitionList } from "./subtitle.content.js";

const meta: Meta = {
  ...examplePageMeta(),
  title: "Patronen/Subtitel/Subtitel voor een Definitie Lijst",
  tags: ["!autodocs"],
};

export default meta;

export const SubtitelVoorEenDefinitieLijst: StoryObj = {
  name: "Subtitel voor een Definitie Lijst",
  render: () => {
    return html`
      <div class="container">
        ${headerPartial({ ...header(), mainMenu: mainMenu("Home") })}

        <main>
          <h1>Stelselcatalogus Omgevingswet</h1>
          <p role="doc-subtitle">Subtitel</p>
          ${definitionListTemplate(definitionList())}
        </main>
      </div>
    `;
  },
};
