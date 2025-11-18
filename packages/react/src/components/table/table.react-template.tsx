import { clsx } from "clsx";
import { Table, TableSorting } from "dso-toolkit";
import * as React from "react";
import { JSX } from "react";

import { DsoIcon, DsoTable } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactTable: ComponentImplementation<Table<JSX.Element>> = {
  component: "table",
  implementation: "react",
  template: () =>
    function tableTemplate({ noModal, content, role, verticalLines }) {
      function getAriaRoledescription(sorting: TableSorting | undefined): string | undefined {
        if (sorting === "ascending") {
          return "sorteer oplopend knop";
        }

        if (sorting === "descending") {
          return "sorteer aflopend knop";
        }

        return undefined;
      }

      return (
        <DsoTable noModal={noModal}>
          <table className={clsx("table", { ["dso-table-vertical-lines"]: verticalLines })} role={role}>
            <caption className="sr-only">{content.caption}</caption>

            <thead>
              <tr>
                {content.head.map((col, cellIndex) =>
                  "sortable" in col ? (
                    <th scope="col" key={cellIndex} aria-sort={col.sorting}>
                      <button
                        type="button"
                        aria-roledescription={getAriaRoledescription(col.sorting)}
                        className={clsx("dso-tertiary dso-sort", { "dso-sort-active": !!col.sorting })}
                      >
                        <span>{col.label}</span>
                        <DsoIcon icon={col.sorting ? "sort-" + col.sorting : "sort"}></DsoIcon>
                      </button>
                    </th>
                  ) : (
                    <th scope="col" key={cellIndex}>
                      {col.label}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row, index) => (
                <tr key={index}>
                  {row.map((col, cellIndex) =>
                    index === 0 ? (
                      typeof col === "string" ? (
                        <th key={cellIndex} scope="row" dangerouslySetInnerHTML={{ __html: col }}></th>
                      ) : (
                        <th key={cellIndex} scope="row">
                          {col}
                        </th>
                      )
                    ) : typeof col === "string" ? (
                      <td key={cellIndex} dangerouslySetInnerHTML={{ __html: col }}></td>
                    ) : (
                      <td key={cellIndex}>{col}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </DsoTable>
      );
    },
};
