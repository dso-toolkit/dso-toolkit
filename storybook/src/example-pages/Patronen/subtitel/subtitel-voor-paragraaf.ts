import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { headerPartial } from "../../partials/header";

examplePageFactory(
  "Patronen",
  "Subtitel",
  "Subtitel voor een Paragraaf",
  (templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Home") })}

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
);
