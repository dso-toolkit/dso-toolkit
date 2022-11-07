import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";
import { footerPartial } from "../partials/footer";

examplePageFactory("Patronen", "Footer", (templates) => html`<div class="container">${footerPartial(templates)}</div>`);
