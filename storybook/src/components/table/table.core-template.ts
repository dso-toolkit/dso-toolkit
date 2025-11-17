import { clsx } from "clsx";
import { Table, TableSorting } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";

export const coreTable: ComponentImplementation<Table<TemplateResult>> = {
  component: "table",
  implementation: "core",
  template: () =>
    function tableTemplate({ noModal, content, headingColumns, role, verticalLines }) {
      function getAriaRoledescription(sorting: TableSorting | undefined): string | undefined {
        if (sorting === "ascending") {
          return "sorteer oplopend knop";
        }

        if (sorting === "descending") {
          return "sorteer aflopend knop";
        }

        return undefined;
      }

      return html`
        <dso-table ?no-modal=${noModal}>
          <table class=${clsx("table", { ["dso-table-vertical-lines"]: verticalLines })} role=${ifDefined(role)}>
            <caption class="sr-only">
              ${content.caption}
            </caption>

            <thead>
              <tr>
                ${content.head.map((col) =>
                  "sortable" in col
                    ? html`<th scope="col" aria-sort=${ifDefined(col.sorting)}>
                        <button
                          type="button"
                          aria-roledescription=${ifDefined(getAriaRoledescription(col.sorting))}
                          class="dso-tertiary dso-sort ${classMap({ "dso-sort-active": !!col.sorting })}"
                        >
                          <span>${col.label}</span>
                          <dso-icon icon=${col.sorting ? "sort-" + col.sorting : "sort"}></dso-icon>
                        </button>
                      </th>`
                    : html`<th scope="col">${col.label}</th> `,
                )}
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
