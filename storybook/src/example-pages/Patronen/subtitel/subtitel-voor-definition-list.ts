import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";
import { definitionList } from "./subtitle.content";

examplePageFactory(
  "Patronen/Subtitel",
  "Subtitel voor een Definitie Lijst",
  ({ definitionListTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}

      <main>
        <h1>Stelselcatalogus Omgevingswet</h1>
        <p role="doc-subtitle">Subtitel</p>
        ${definitionListTemplate(definitionList)}
      </main>
    </div>
  `,
);
