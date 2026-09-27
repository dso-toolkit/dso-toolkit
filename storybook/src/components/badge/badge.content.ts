import { html } from "lit-html";

import { richContentTemplate } from "../rich-content/rich-content.template.js";

export function children() {
  return richContentTemplate({
    children: html`<p>Er zijn wijzigingsbesluiten genomen. Bekijk een besluit om de veranderingen te zien.</p>`,
  });
}
