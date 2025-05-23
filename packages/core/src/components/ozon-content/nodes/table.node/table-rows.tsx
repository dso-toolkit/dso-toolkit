import { Fragment, FunctionalComponent, h } from "@stencil/core";

import { OzonContentNodeContext } from "../../ozon-content-node-context.interface";

import { Colspecs } from "./colspec/colspec.interface";
import { Cell } from "./table-cell";

export const Rows: FunctionalComponent<{
  context: OzonContentNodeContext;
  colspecs: Colspecs | undefined;
  rows: Element[];
}> = ({ context, colspecs, rows }) => {
  return (
    <>
      {rows.map((row) => (
        <tr>
          {Array.from(row.children).map((cell) => (
            <Cell cell={cell} colspecs={colspecs} context={context} />
          ))}
        </tr>
      ))}
    </>
  );
};
