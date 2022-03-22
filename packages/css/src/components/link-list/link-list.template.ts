import { LinkList, LinkListType } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

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

export function linkListTemplate({ navLabel, type, links }: LinkList) {
  const children = html`
    ${links.map(link => html`
      <li>
        ${anchorTemplate(navLabel ? link : { ...link, ariaCurrent: undefined })}
      </li>
    `)}
  `;

  const list = type === LinkListType.Ol
    ? ol(children)
    : ul(children)

  if (navLabel) {
    return html`
      <nav aria-label=${navLabel} class="dso-link-list-nav">
        ${list}
      </nav>
    `;
  }

  return list;
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
