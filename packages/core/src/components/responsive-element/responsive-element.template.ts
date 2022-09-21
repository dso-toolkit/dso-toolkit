import { ResponsiveElement } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function responsiveElementTemplate({ onSizeChange }: ResponsiveElement, children: TemplateResult) {
  return html`
    <dso-responsive-element
      @dsoSizeChange=${onSizeChange}
    >
      ${children}
    </dso-responsive-element>
  `;
}
