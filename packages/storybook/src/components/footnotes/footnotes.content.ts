import { html, TemplateResult } from 'lit-html';

export function footnotesExampleTemplate(footnote14: TemplateResult, footnote15: TemplateResult, footnotes: TemplateResult) {
  return html`
    <p>
      In juli 2018 is er een quick scan natuur uitgevoerd voor het plangebied${footnote14}. Dit onderzoek is een actualisatie van een eerder door Blom Ecologie uitgevoerd oriënterend onderzoek dat vanwege de datum van uitvoering haar geldigheid was verloren. In januari 2019 is dit onderzoek aangevuld${footnote15} met vrije kavel, welke eveneens onderdeel zijn van dit bestemmingsplan.
    </p>
    ${footnotes}
  `;
}
