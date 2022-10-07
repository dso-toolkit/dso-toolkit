import { CardGrid, CardList } from '@dso-toolkit/sources';
import { html, TemplateResult } from 'lit-html';
import { ComponentImplementation } from '../../templates';

export const cssCardGrid: ComponentImplementation<CardGrid<TemplateResult>> = {
  component: 'cardGrid',
  implementation: 'css',
  template: ({ cardTemplate }) => function cardGridTemplate({ cards }: CardList<TemplateResult>) {
    return html`
      <div class="dso-card-grid">
        ${cards.map(card => cardTemplate(card))}
      </div>
    `;
  }
}
