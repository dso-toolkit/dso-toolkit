import { Footnote } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssFootnotes: ComponentImplementation<Footnote[]> = {
  component: "footnotes",
  implementation: "css",
  template: () =>
    function footnotesListTemplate(footnotes) {
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
            `
          )}
        </ol>
      `;
    },
};
