import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Componenten/Application Heading",
  "Application Heading met Subtitle",
  ({ applicationHeadingTemplate }) => html`
    <div class="container">
      ${applicationHeadingTemplate({
        title: "Vergunningscheck",
        subtitle: "2. Kies werkzaamheden",
      })}
    </div>
  `,
);
