import { Definition, DefinitionList } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

function definitionTemplate({ term, descriptions }: Definition) {
  return html`
    <dt>${term}:</dt>
    ${descriptions.map(description => html`
      <dd>${unsafeHTML(description)}</dd>
    `)}
  `;
}

export function definitionListTemplate({ modifier, definitions }: DefinitionList) {
  return html`
    <dl class=${ifDefined(modifier)}>
      ${definitions.map(definition => modifier?.split(' ').includes('dso-columns')
        ? html`
            <div>${definitionTemplate(definition)}</div>
          `
        : definitionTemplate(definition)
      )}
    </dl>
  `;
}
