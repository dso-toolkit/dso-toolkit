import { Definition, DefinitionList } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

function definitionTemplate({ term, descriptions }: Definition<TemplateResult>, useSrOnlyColon: boolean) {
  return html`
    <dt>
      ${term}${useSrOnlyColon
        ? html`<span class="sr-only">:</span>`
        : ':'
      }
    </dt>
    ${descriptions.map(description => html`
      <dd>${typeof description === 'string' ? unsafeHTML(description) : description}</dd>
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
