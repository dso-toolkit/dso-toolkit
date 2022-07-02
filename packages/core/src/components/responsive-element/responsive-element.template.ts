import { ResponsiveElement } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function responsiveElementTemplate({ children }: ResponsiveElement<TemplateResult>) {
  return html`
    <dso-responsive-element>
      ${children}
    </dso-responsive-element>
  `;
}
