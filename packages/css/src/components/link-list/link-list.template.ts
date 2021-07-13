import { LinkList, LinkListType } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import { anchorTemplate } from '../anchor/anchor.template';
import { highlightBoxTemplate } from '../highlight-box/highlight-box.template';

function ul(children: TemplateResult) {
  return html`
    <ul class="dso-link-list">
      ${children}
    </ul>
  `;
}

function ol(children: TemplateResult) {
  return html`
    <ol class="dso-link-list">
      ${children}
    </ol>
  `;
}

export function linkListTemplate({ type, links }: LinkList) {
  const children = html`
    ${links.map(link => html`
      <li>
        ${anchorTemplate(link)}
      </li>
    `)}
  `;

  if (type === LinkListType.Ol) {
    return ol(children);
  }

  return ul(children);
}

export function inFooterTemplate(linkList: TemplateResult) {
  return html`
    <footer>
      ${linkList}
    </footer>
  `;
}

export function inHighlightBoxTemplate(linkList: TemplateResult) {
  return html`
    ${highlightBoxTemplate({ richContent: linkList })}
    ${highlightBoxTemplate({ richContent: linkList, yellow: true })}
    ${highlightBoxTemplate({ richContent: linkList, border: true })}
    ${highlightBoxTemplate({ richContent: linkList, dropShadow: true, white: true })}
  `;
}
