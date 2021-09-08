import { Cards } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function cardsTemplate({ }: Cards<TemplateResult>) {
  return html`
    <dso-cards>
      <dso-card label="Card-label" content="Card-content"></dso-card>
        <dso-interaction></dso-interaction>
      </dso-card>
    </dso-card>
  `;
}
