import { Footnote } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function footnotesReferenceTemplate({ number }: Footnote) {
  return html`
    <sup id="#voetnoot-${number}-link" class="dso-footnote-reference"><a href="#voetnoot-${number}">[${number}]</a></sup>
  `;
}

export function footnotesListTemplate(footnotes: Footnote[]) {
  return html`
    <ol class="dso-footnotes">
      ${footnotes.map(f => html`
        <li class="dso-footnote" id="voetnoot-${f.number}">
          ${f.number}. <a
            href="#voetnoot-${f.number}-link"
            class="dso-footnote-backlink"
            aria-label="Terug naar voetnoot ${f.number}"
            title="Terug naar voetnoot ${f.number}"
          ></a> ${f.label}
        </li>
      `)}
    </ol>
  `;
};

