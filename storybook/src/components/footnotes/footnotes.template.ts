import { html } from "lit-html";

import { Footnote } from "./footnotes.models.js";

export function footnotesTemplate(footnotes: Footnote[]) {
  return html`
    <ol class="dso-footnotes">
      ${footnotes.map(
        (f) => html`
          <li class="dso-footnote" id="voetnoot-${f.number}">
            ${f.number}.
            <a
              href="#voetnoot-${f.number}-link"
              class="dso-footnote-backlink"
              aria-label="Terug naar voetnoot ${f.number}"
              title="Terug naar voetnoot ${f.number}"
            ></a>
            ${f.label}
          </li>
        `,
      )}
    </ol>
  `;
}
