import { html } from "lit-html";

import { Templates } from "../../templates";

export function children({ richContentTemplate }: Templates) {
  return richContentTemplate({
    children: html`<p>Er zijn wijzigingsbesluiten genomen. Bekijk een besluit om de veranderingen te zien.</p>`,
  });
}
