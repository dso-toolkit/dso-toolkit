import { CardList } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';

import { cardTemplate } from '../card/card.template';

export function cardGridTemplate({ cards }: CardList<TemplateResult>) {
  return html`
    <div class="dso-card-grid">
      ${cards.map(card => cardTemplate(card))}
    </div>
  `;
}
