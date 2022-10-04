import { ResponsiveElement } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function responsiveElementTemplate({ dsoSizeChange }: ResponsiveElement, children: TemplateResult) {
  return html`
    <dso-responsive-element
      @dsoSizeChange=${dsoSizeChange}
    >
      ${children}
    </dso-responsive-element>
  `;
}
