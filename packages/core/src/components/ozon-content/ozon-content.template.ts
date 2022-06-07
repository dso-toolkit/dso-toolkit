import { html } from 'lit-html';

import { OzonContent } from '@dso-toolkit/sources';

export function ozonContentTemplate({ content, inline, deleted, onAnchorClick }: OzonContent) {
  return html`
    <dso-ozon-content
      .content=${content}
      ?inline=${inline}
      ?deleted=${deleted}
      @anchorClick=${onAnchorClick}
    ></dso-ozon-content>
  `;
}
