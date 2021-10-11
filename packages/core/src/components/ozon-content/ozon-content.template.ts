import { html } from 'lit-html';

import { OzonContent } from '@dso-toolkit/sources';

export function ozonContentTemplate({ content, onAnchorClick }: OzonContent) {
  return html`
    <dso-ozon-content
      .content=${content}
      @anchorClick=${onAnchorClick}
    ></dso-ozon-content>
  `;
}
