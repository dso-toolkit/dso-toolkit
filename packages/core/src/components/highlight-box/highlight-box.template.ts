import { HighlightBox } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

import { iconTemplate } from '../icon/icon.template';

export function highlightBoxTemplate({ yellow, white, dropShadow, border, step, icon, richContent }: HighlightBox<TemplateResult>) {
  return html`
    <dso-highlight-box
      step=${ifDefined(typeof step === 'number' && step > 0 ? step : undefined)}
      ?yellow=${yellow}
      ?white=${white}
      ?drop-shadow=${dropShadow}
      ?border=${border}
    >
      ${icon && iconTemplate({ icon }, 'icon')}
      <div class="dso-rich-content">
        ${typeof richContent === 'string' ? unsafeHTML(richContent) : richContent}
      </div>
    </dso-highlight-box>
  `;
}
