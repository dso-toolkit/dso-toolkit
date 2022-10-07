import { HighlightBox } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { ComponentImplementation } from '../../templates';

export const coreHighlightBox: ComponentImplementation<HighlightBox> = {
  component: 'highlightBox',
  implementation: 'core',
  template: ({ iconTemplate }) => function highlightBoxTemplate({ yellow, white, dropShadow, border, step, icon, richContent }: HighlightBox) {
    return html`
      <dso-highlight-box
        step=${ifDefined(typeof step === 'number' && step > 0 ? step : undefined)}
        ?yellow=${yellow}
        ?white=${white}
        ?drop-shadow=${dropShadow}
        ?border=${border}
      >
        ${icon && iconTemplate({ icon, slot: 'icon' })}
        <div class="dso-rich-content">
          ${typeof richContent === 'string' ? unsafeHTML(richContent) : richContent}
        </div>
      </dso-highlight-box>
    `;
  }
}
