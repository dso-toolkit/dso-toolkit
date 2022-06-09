import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { OzonContent } from '@dso-toolkit/sources';

export function ozonContentTemplate({ content, inline, interactive, deleted, onAnchorClick, onClick }: OzonContent) {
  return html`
    <dso-ozon-content
      .content=${content}
      ?inline=${inline}
      ?interactive=${interactive}
      ?deleted=${deleted}
      @anchorClick=${onAnchorClick}
      @dsoClick=${ifDefined(interactive ? onClick : undefined)}
    ></dso-ozon-content>
  `;
}
