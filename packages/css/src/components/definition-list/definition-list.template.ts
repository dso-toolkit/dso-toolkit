import { Definition, DefinitionDescriptionContent, DefinitionDescriptionItems, DefinitionList } from '@dso-toolkit/sources';

import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { columnsListTemplate } from '../columns-list/columns-list.template';

function definitionContentTemplate(description: DefinitionDescriptionContent<TemplateResult> | DefinitionDescriptionItems) {
  if ('content' in description) {
    if (typeof description.content === 'string') {
      return unsafeHTML(description.content);
    }

    return description.content;
  }

  return columnsListTemplate(description.columnsList);
}

function definitionTemplate({ term, descriptions }: Definition<TemplateResult>, useSrOnlyColon: boolean) {
  return html`
    <dt>
      ${term}${useSrOnlyColon
        ? html`<span class="sr-only">:</span>`
        : ':'
      }
    </dt>
    ${descriptions.map(description => html`
      <dd>${definitionContentTemplate(description)}</dd>
    `)}
  `;
}

export function definitionListTemplate({ modifier, definitions, useSrOnlyColon }: DefinitionList<TemplateResult>) {
  return html`
    <dl class=${ifDefined(modifier)}>
      ${definitions.map(definition => modifier?.split(' ').includes('dso-columns')
        ? html`
            <div>${definitionTemplate(definition, useSrOnlyColon)}</div>
          `
        : definitionTemplate(definition, useSrOnlyColon)
      )}
    </dl>
  `;
}
