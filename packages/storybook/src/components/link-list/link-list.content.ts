import { highlightBoxTemplate } from '@dso-toolkit/core/src/components/highlight-box/highlight-box.template';
import { html, TemplateResult } from 'lit-html';

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
