import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Componenten/Application Heading",
  "Application Heading alleen Subtitle",
  ({ applicationHeadingTemplate }) => html`
    <div class="container">
      ${applicationHeadingTemplate({
        subtitle: "Kies werkzaamheden",
      })}
    </div>
  `,
);
