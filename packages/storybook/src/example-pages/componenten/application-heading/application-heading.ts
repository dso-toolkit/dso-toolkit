import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Toepassingen/Componenten/Application Heading",
  "Application Heading",
  ({ applicationHeadingTemplate }) => html`
    <div class="container">
      ${applicationHeadingTemplate({
        title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
      })}
    </div>
  `
);
