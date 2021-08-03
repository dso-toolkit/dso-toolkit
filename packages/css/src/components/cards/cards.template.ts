import { Cards } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { cardTemplate } from '../card/card.template';

export function cardsTemplate({ cards }: Cards<TemplateResult>) {
  return html`
    <ul class="dso-cards">
      ${cards.map((card: any) => html`
        <li>
          ${cardTemplate(card)}
        </li>
      `)}
    </ul>
  `;
}
