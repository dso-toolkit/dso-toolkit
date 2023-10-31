import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Toepassingen/Componenten/Application Heading",
  "Application Heading met Subtitle en Step",
  ({ applicationHeadingTemplate }) => html`
    <div class="container">
      ${applicationHeadingTemplate({
        title: "Vergunningscheck",
        subtitle: "2. Kies werkzaamheden",
        step: "Stap 2 van 4",
      })}
    </div>
  `
);
