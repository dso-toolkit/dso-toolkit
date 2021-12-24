import { ColumnsList } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function columnsListTemplate({ listItems }: ColumnsList) {
  return html`
    <ul class="dso-columns-list">
      ${listItems.map(item => html`
        <li>${item.listItem}</li>
      `)}
    </ul>
  `;
}
