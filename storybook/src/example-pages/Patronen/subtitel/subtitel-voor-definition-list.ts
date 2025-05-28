import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { headerPartial } from "../../partials/header";

import { definitionList } from "./subtitle.content";

examplePageFactory(
  "Patronen",
  "Subtitel",
  "Subtitel voor een Definitie Lijst",
  ({ definitionListTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Home") })}

      <main>
        <h1>Stelselcatalogus Omgevingswet</h1>
        <p role="doc-subtitle">Subtitel</p>
        ${definitionListTemplate(definitionList)}
      </main>
    </div>
  `,
);
