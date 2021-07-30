import { Cards } from '@dso-toolkit/sources';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

import { cardTemplate } from '../card/card.template';

export function cardsTemplate({ modifiers, interactionsLocation, cards }: Cards) {
  return html`
    <ul class="dso-cards ${classMap({ modifiers, [`dso-${interactionsLocation}`]: !!interactionsLocation, })}">
      ${cards.map(card => html`
        <li>
          ${cardTemplate(card)}
        </li>
      `)}
    </ul>
  `;
}
