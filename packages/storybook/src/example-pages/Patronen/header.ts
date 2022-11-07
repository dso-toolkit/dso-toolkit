import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";
import { headerPartial } from "../partials/header";
import { header } from "../partials/header.content";

examplePageFactory(
  "Patronen",
  "Header",
  (templates) => html`<div class="container">${headerPartial(templates, header)}</div>`
);
