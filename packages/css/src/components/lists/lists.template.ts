import { Lists, ListItem, ListType } from '@dso-toolkit/sources';

import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

function ul(children: TemplateResult, modifier?: string) {
  return html`
    <ul class="${classMap({
      'list-group': modifier === 'group',
      'dso-columns-list': modifier === 'columns'
    })}">
      ${children}
    </ul>
  `;
}

function ol(children: TemplateResult, modifier?: string) {
  return html`
    <ol class="${classMap({
      'list-group': modifier === 'group',
      'dso-columns-list': modifier === 'columns'
    })}">
      ${children}
    </ol>
  `;
}

export function listsTemplate({ type, items, modifier }: Lists) {
  const children = html`
    ${items.map((item: ListItem) => html`
      <li class="${classMap({'list-group-item': modifier === 'group'})}">
        ${item.text}
        ${item.paragraph && html`
          <p>${item.paragraph}</p>
        `}
      </li>
    `)}
  `;

  if (type === ListType.Ol) {
    return ol(children, modifier);
  }

  return ul(children, modifier);
}
