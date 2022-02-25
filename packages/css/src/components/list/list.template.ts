import { List, Type } from '@dso-toolkit/sources';

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

export function listTemplate({ type, listItems, modifier }: List) {
  const children = html`
    ${listItems.map(item => html`
      <li class="${classMap({'list-group-item': modifier === 'group'})}">
        ${item}
      </li>
    `)}
  `;

  if (type === Type.Ol) {
    return ol(children, modifier);
  }

  return ul(children, modifier);
}
