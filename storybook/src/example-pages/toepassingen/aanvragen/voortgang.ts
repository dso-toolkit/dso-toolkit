import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Aanvragen",
  "Voortgang",
  ({ listTemplate }) => html`
    <div class="container">
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
    </div>
  `,
);
