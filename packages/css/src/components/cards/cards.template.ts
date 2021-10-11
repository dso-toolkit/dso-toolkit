import { Cards } from '@dso-toolkit/sources';
import { html } from 'lit-html';

import { cardTemplate } from '../card/card.template';

export function cardsTemplate({ cards }: Cards) {
  return html`
    <ul class="dso-card-list">
      ${cards.map((card: any) => html`
        <li>
          ${cardTemplate(card)}
        </li>
      `)}
    </ul>
  `;
}
