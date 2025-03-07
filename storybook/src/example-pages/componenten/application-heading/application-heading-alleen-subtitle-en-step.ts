import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Componenten/Application Heading",
  "Application Heading alleen Subtitle en Step",
  ({ applicationHeadingTemplate }) => html`
    <div class="container">
      ${applicationHeadingTemplate({
        subtitle: "Kies werkzaamheden",
        step: "Stap 2 van 4",
      })}
    </div>
  `,
);
