import { Table } from '@dso-toolkit/sources';

import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { ComponentImplementation } from '../../templates';

export const coreTable: ComponentImplementation<Table> = {
  component: 'table',
  implementation: 'core',
  template: () => function tableTemplate({ noModal, content }) {
    return html`
      <dso-table
        ?no-modal=${noModal}
      >
        <table class="table">
          <caption>${content.caption}</caption>
  
          <thead>
            <tr>
              ${content.head.map(col => html`<th scope="col">${col}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${content.rows.map(row => html`
              <tr>
                ${row.map((col, index) => index === 0 ? html`<th scope="row">${unsafeHTML(col)}</th>` : html`<td>${unsafeHTML(col)}</td>`)}
              </tr>
            `)}
          </tbody>
        </table>
      </dso-table>
    `;
  }
};
