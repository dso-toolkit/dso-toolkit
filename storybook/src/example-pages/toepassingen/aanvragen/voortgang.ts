import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { header } from "../../content/header.content";
import { mainMenu } from "../../content/main-menu.content";
import { headerPartial } from "../../partials/header";
import { footerPartial } from "../../partials/footer";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Voortgang",
  ({ listTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, { ...header, mainMenu: mainMenu("Aanvragen") })}
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
            { text: "Documenten indienen.", icon: { icon: "clock" } },
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
            { text: "Documenten indienen.", icon: { icon: "clock" } },
          ],
        })}
        <hr />
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);
