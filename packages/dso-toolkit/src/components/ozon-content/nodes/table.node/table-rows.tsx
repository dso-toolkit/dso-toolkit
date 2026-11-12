import { Fragment, FunctionalComponent, h } from "@stencil/core";

import { parseWijzigactieFromNode } from "../../functions/parse-wijzigactie-from-node.function";
import { OzonContentNodeContext } from "../../ozon-content-node-context.interface";

import { Colspecs } from "./colspec/colspec.interface";
import { Cell } from "./table-cell";
import { Header } from "./table-header";

export const Rows: FunctionalComponent<{
  context: OzonContentNodeContext;
  colspecs: Colspecs | undefined;
  rows: Element[];
  head?: boolean;
}> = ({ context, colspecs, rows, head }) => {
  return (
    <Fragment>
      {rows.map((row) => (
        <tr>
          {Array.from(row.children).map(
            (cell) =>
              (head && (
                <Header cell={cell} colspecs={colspecs} context={context} wijzigactie={parseWijzigactieFromNode(row)} />
              )) || (
                <Cell cell={cell} colspecs={colspecs} context={context} wijzigactie={parseWijzigactieFromNode(row)} />
              ),
          )}
        </tr>
      ))}
    </Fragment>
  );
};
