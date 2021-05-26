import {
  storiesOfFootnotes,
  FootnotesReferenceArgs,
  FootnotesListArgs,
  FootnotesExampleArgs,
  FootnotesExampleTemplateFn,
  Footnote
} from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const reference = ({ number }: Footnote) => html`
  <sup id="#voetnoot-${number}-link" class="dso-footnote-reference"><a href="#voetnoot-${number}">[${number}]</a></sup>
`;

const list = (footnotes: Footnote[]) => html`
  <ol class="dso-footnotes">
    ${footnotes.map(f => html`
      <li class="dso-footnote" id="voetnoot-${f.number}">
        ${f.number}. <a href="#voetnoot-${f.number}-link" class="dso-footnote-backlink" aria-label="Terug naar voetnoot ${f.number}" title="Terug naar voetnoot ${f.number}"></a> ${f.label}
      </li>
    `)}
  </ol>
`;

const exampleTemplate: FootnotesExampleTemplateFn<TemplateResult> = ({
  footnote14,
  footnote15,
  footnotes
}: FootnotesExampleArgs) => html`
  <p>In juli 2018 is er een quick scan natuur uitgevoerd voor het plangebied${reference(footnote14)}. Dit onderzoek is een actualisatie van een eerder door Blom Ecologie uitgevoerd oriënterend onderzoek dat vanwege de datum van uitvoering haar geldigheid was verloren. In januari 2019 is dit onderzoek aangevuld${reference(footnote15)} met vrije kavel, welke eveneens onderdeel zijn van dit bestemmingsplan.</p>
  ${list(footnotes)}
`;

storiesOfFootnotes<TemplateResult>({
  module,
  storiesOf,
  readme,
  reference: ({ footnote }: FootnotesReferenceArgs) => reference(footnote),
  list: ({ footnotes }: FootnotesListArgs) => list(footnotes),
  example: exampleTemplate
});
