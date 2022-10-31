import { Table } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoTable } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactTable: ComponentImplementation<Table> = {
  component: "table",
  implementation: "react",
  template: () =>
    function tableTemplate({ noModal, content }) {
      return (
        <DsoTable noModal={noModal}>
          <table className="table">
            <caption>{content.caption}</caption>

            <thead>
              <tr>
                {content.head.map((col) => (
                  <th scope="col" key={col} dangerouslySetInnerHTML={{ __html: col }}></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((col, index) =>
                    index === 0 ? (
                      <th key={row[0] + index} scope="row" dangerouslySetInnerHTML={{ __html: col }}></th>
                    ) : (
                      <td key={row[0] + index} dangerouslySetInnerHTML={{ __html: col }}></td>
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
