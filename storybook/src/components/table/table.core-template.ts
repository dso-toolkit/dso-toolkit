import clsx from "clsx";

import { Table } from "dso-toolkit";

import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";

export const coreTable: ComponentImplementation<Table<TemplateResult>> = {
  component: "table",
  implementation: "core",
  template: () =>
    function tableTemplate({ noModal, content, headingColumns, role, verticalLines }) {
      return html`
        <dso-table ?no-modal=${noModal}>
          <table class=${clsx("table", { ["dso-table-vertical-lines"]: verticalLines })} role=${ifDefined(role)}>
            <caption class="sr-only">
              ${content.caption}
            </caption>

            <thead>
              <tr>
                ${content.head.map((col) => html`<th scope="col">${col}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${content.rows.map(
                (row) => html`
                  <tr>
                    ${row.map((col, index) =>
                      index === 0 && headingColumns
                        ? html`<th scope="row">${typeof col === "string" ? unsafeHTML(col) : col}</th>`
                        : html`<td>${typeof col === "string" ? unsafeHTML(col) : col}</td>`,
                    )}
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </dso-table>
      `;
    },
};
