import { html } from "lit-html";

import { richContentTemplate } from "../rich-content/rich-content.template.js";

export const infoRichContent = html`${richContentTemplate({
  children: html`
    <p>Rijke inhoud</p>
    <p>Ziet er zo uit</p>
    <ul>
      <li>Lijstjes</li>
    </ul>
    <p>Kan allemaal</p>
  `,
  slot: "info",
})}`;
