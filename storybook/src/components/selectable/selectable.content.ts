import { html } from "lit-html";

import { Templates } from "../../templates";

export function infoRichContent({ richContentTemplate }: Templates) {
  return richContentTemplate({
    children: html`
      <p>Rijke inhoud</p>
      <p>Ziet er zo uit</p>
      <ul>
        <li>Lijstjes</li>
      </ul>
      <p>Kan allemaal</p>
    `,
    slot: "info",
  });
}
