import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageMeta } from "../../../example-page-meta.js";
import { header } from "../../content/header.content.js";
import { mainMenu } from "../../content/main-menu.content.js";
import { headerPartial } from "../../partials/header.js";

const meta: Meta = {
  ...examplePageMeta(),
  title: "Patronen/Subtitel/Subtitel voor een Paragraaf",
  tags: ["!autodocs"],
};

export default meta;

export const SubtitelVoorEenParagraaf: StoryObj = {
  name: "Subtitel voor een Paragraaf",
  render: () => html`
    <div class="container">
      ${headerPartial({ ...header(), mainMenu: mainMenu("Home") })}

      <main>
        <h1>Stelselcatalogus Omgevingswet</h1>
        <p role="doc-subtitle">Subtitel</p>
        <p>
          De Stelselcatalogus Omgevingswet (DSO StelselCatalogus) is een online naslagwerk en dient als ondersteunend
          binnen de DSO-LV. In de DSO StelselCatalogus kunt u begrippen, activiteiten, werkzaamheden, waardelijsten en
          informatieproducten vinden die bruikbaar zijn binnen de DSO Keten en afkomstig uit diverse domeinen.
        </p>
      </main>
    </div>
  `,
};
