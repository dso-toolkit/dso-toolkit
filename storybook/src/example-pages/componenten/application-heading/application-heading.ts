import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Componenten/Application Heading",
  "Application Heading",
  ({ applicationHeadingTemplate }) => html`
    <div class="container">
      ${applicationHeadingTemplate({
        title: "Vergunningcheck",
      })}
    </div>
  `,
);
