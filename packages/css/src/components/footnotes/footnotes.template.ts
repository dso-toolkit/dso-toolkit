import { Footnote } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

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

export function footnotesExampleTemplate(footnote14: TemplateResult, footnote15: TemplateResult, footnotes: TemplateResult) {
  return html`
    <p>
      In juli 2018 is er een quick scan natuur uitgevoerd voor het plangebied${footnote14}. Dit onderzoek is een actualisatie van een eerder door Blom Ecologie uitgevoerd oriënterend onderzoek dat vanwege de datum van uitvoering haar geldigheid was verloren. In januari 2019 is dit onderzoek aangevuld${footnote15} met vrije kavel, welke eveneens onderdeel zijn van dit bestemmingsplan.
    </p>
    ${footnotes}
  `;
}
