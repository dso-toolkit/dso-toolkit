import { FunctionalComponent } from "@stencil/core";
import { h, JSXBase } from "@stencil/core/internal";

import { OzonContentNodeContext } from "../../ozon-content-node-context.interface";
import { Colspecs } from "./colspec/colspec.interface";

function getData(cell: Element) {
  return {
    moreRows: cell.getAttribute("morerows"),
    nameStart: cell.getAttribute("namest"),
    nameEnd: cell.getAttribute("nameend"),
  };
}

function getColspan({ columns }: Colspecs, nameStart: string, nameEnd: string): number | undefined {
  const colspecStart = columns.find((c) => c.name === nameStart);
  const colspecEnd = columns.find((c) => c.name === nameEnd);
  if (!colspecStart || !colspecEnd) {
    return undefined;
  }

  const colspan = colspecEnd.number - colspecStart.number + 1;

  return colspan === 1 ? undefined : colspan;
}

export const Cell: FunctionalComponent<{
  context: OzonContentNodeContext;
  colspecs: Colspecs | undefined;
  cell: Element;
}> = ({ context: { mapNodeToJsx }, colspecs, cell }) => {
  const { moreRows, nameStart, nameEnd } = getData(cell);

  const td: JSXBase.TdHTMLAttributes<HTMLTableCellElement> = {
    rowSpan: moreRows ? parseInt(moreRows, 10) + 1 : undefined,
    colSpan: colspecs && nameStart && nameEnd ? getColspan(colspecs, nameStart, nameEnd) : undefined,
  };

  return <td {...td}>{mapNodeToJsx(cell.childNodes)}</td>;
};
