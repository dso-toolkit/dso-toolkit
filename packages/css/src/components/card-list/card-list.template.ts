import { CardList } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { cardTemplate } from '../card/card.template';

export function cardListTemplate({ cards }: CardList<TemplateResult>) {
  return html`
    <ul class="dso-card-list">
      ${cards.map(card => html`
        <li>
          ${cardTemplate(card)}
        </li>
      `)}
    </ul>
  `;
}
