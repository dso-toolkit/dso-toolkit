import { Table } from "dso-toolkit";
import * as React from "react";
import { clsx } from "clsx";

import { DsoTable } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactTable: ComponentImplementation<Table<JSX.Element>> = {
  component: "table",
  implementation: "react",
  template: () =>
    function tableTemplate({ noModal, content, role, verticalLines }) {
      return (
        <DsoTable noModal={noModal}>
          <table className={clsx("table", { ["dso-table-vertical-lines"]: verticalLines })} role={role}>
            <caption className="sr-only">{content.caption}</caption>

            <thead>
              <tr>
                {content.head.map((col) => (
                  <th scope="col" key={col} dangerouslySetInnerHTML={{ __html: col }}></th>
                ))}
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
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </DsoTable>
      );
    },
};
