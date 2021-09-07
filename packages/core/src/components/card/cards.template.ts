import { Cards } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

export function cardsTemplate({ cards }: Cards<TemplateResult>) {
  return html`
    <ul class="dso-cards">
      ${cards.map((card: any) => html`
        <li>
          <dso-card label=${card.label} content=${card.content}></dso-card>
        </li>
      `)}
    </ul>
  `;
}
