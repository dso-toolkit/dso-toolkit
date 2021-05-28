import { storiesOfDefinitionList, Definition, DefinitionListArgs, DefinitionListTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

// @ts-ignore
import readme from './readme.md';

const definitionTemplate = ({ term, descriptions }: Definition) => html`
  <dt>${term}</dt>
  ${descriptions.map(description => html`
    <dd>${unsafeHTML(description)}</dd>
  `)}
`;

const template: DefinitionListTemplateFn<TemplateResult> = ({ modifier, definitions }: DefinitionListArgs) => html`
  <dl class=${ifDefined(modifier)}>
    ${definitions.map(definition => modifier?.split(' ').includes('dso-columns')
      ? html`
        <div>${definitionTemplate(definition)}</div>
      `
      : definitionTemplate(definition)
    )}
  </dl>
`;

storiesOfDefinitionList<TemplateResult>({
  storiesOf,
  module,
  readme,
  template
});
