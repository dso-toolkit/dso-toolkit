import { Card } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function cardTemplate({ label, content }: Card<TemplateResult>) {
  return html`
    <dso-card label=${label} content=${content}></dso-card>
  `;
}
