import { HighlightBox } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

export function highlightBoxTemplate({ yellow, white, dropShadow, border, step, icon, richContent }: HighlightBox<TemplateResult>) {
  return html`
    <dso-highlight-box
      step=${ifDefined(typeof step === 'number' && step > 0 ? step : undefined)}
      ?yellow=${yellow}
      ?white=${white}
      ?drop-shadow=${dropShadow}
      ?border=${border}
    >
      ${icon && html`
        <dso-icon slot="icon" icon=${icon}></dso-icon>
      `}
      ${richContent}
    </dso-highlight-box>
  `;
}
