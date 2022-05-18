import { html } from 'lit-html';

import { OzonContent } from '@dso-toolkit/sources';

export function ozonContentTemplate({ content, inline, onAnchorClick }: OzonContent) {
  return html`
    <dso-ozon-content
      .content=${content}
      ?inline=${inline}
      @anchorClick=${onAnchorClick}
    ></dso-ozon-content>
  `;
}
