import { List, Type } from '@dso-toolkit/sources';

import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';

function ul(children: TemplateResult, modifier?: string) {
  return html`
    <ul class="${classMap({
      'list-group': modifier === 'group',
      'dso-columns-list': modifier === 'columns',
      'dso-img-list': modifier === 'img-list',
      'dso-list-unstyled': modifier === 'unstyled'
    })}">
      ${children}
    </ul>
  `;
}

function ol(children: TemplateResult, modifier?: string) {
  return html`
    <ol class="${classMap({
      'list-group': modifier === 'group',
      'dso-columns-list': modifier === 'columns',
      'dso-img-list': modifier === 'img-list',
      'dso-list-unstyled': modifier === 'unstyled'
    })}">
      ${children}
    </ol>
  `;
}

export function listTemplate({ type, items, modifier }: List) {
  const children = html`
    ${items.map(item => html`
      <li class="${classMap({'list-group-item': modifier === 'group'})}">
        ${modifier === 'img-list' ?
          html`
            <img src=${item.imgSrc} />
          `
          : nothing
        }
        ${item.text}
      </li>
    `)}
  `;

  if (type === Type.Ol) {
    return ol(children, modifier);
  }

  return ul(children, modifier);
}
