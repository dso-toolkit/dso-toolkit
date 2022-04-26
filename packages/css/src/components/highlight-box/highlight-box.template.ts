import { HighlightBox } from '@dso-toolkit/sources';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { iconTemplate } from '../icon/icon.template';

export function highlightBoxTemplate<T = TemplateResult>({ yellow, white, dropShadow, border, step, icon, richContent }: HighlightBox<T>) {
  return html`
    <div class="dso-highlight-box ${classMap({
      'dso-yellow': !!yellow,
      'dso-white': !!white,
      'dso-drop-shadow': !!dropShadow,
      'dso-border': !!border,
      'dso-has-counter': !!(step || icon)
    })}">
      ${(step || icon)
        ? html`
          <div class="dso-step-counter">
            ${step ?? iconTemplate({ icon: icon! })}
          </div>
        `
        : nothing
      }
      <div class="dso-rich-content">
        ${typeof richContent === 'string' ? unsafeHTML(richContent) : richContent}
      </div>
    </div>
  `;
}
