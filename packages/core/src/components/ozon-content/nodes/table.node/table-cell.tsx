import { FunctionalComponent } from "@stencil/core";
import { h } from "@stencil/core/internal";
import clsx from "clsx";

import { WrapWijzigactie } from "../../functional-components/wrap-wijzigactie.functional-component";
import { wijzigactieToClassName } from "../../functions/wijzigactie-to-class-name.function";
import { OzonContentNodeContext } from "../../ozon-content-node-context.interface";
import { OzonContentWijzigActie } from "../../ozon-content.interfaces";

import { Colspecs } from "./colspec/colspec.interface";

function getColspecStartColsep({ columns }: Colspecs, nameStart: string): string | null {
  const colspecStart = columns.find((c) => c.name === nameStart);

  return colspecStart ? colspecStart.colsep : null;
}

function getColspecStartRowsep({ columns }: Colspecs, nameStart: string): string | null {
  const colspecStart = columns.find((c) => c.name === nameStart);

  return colspecStart ? colspecStart.rowsep : null;
}

function getData(cell: Element, colspecs?: Colspecs) {
  const nameStart = cell.getAttribute("namest");
  const row = cell.parentElement;
  const tgroup = row?.parentElement?.parentElement;
  const table = tgroup?.parentElement;
  const colsep =
    cell.getAttribute("colsep") ||
    (colspecs && nameStart ? getColspecStartColsep(colspecs, nameStart) : null) ||
    (tgroup && tgroup.getAttribute("colsep")) ||
    (table && table.getAttribute("colsep"));
  const rowsep =
    cell.getAttribute("rowsep") ||
    (row && row.getAttribute("rowsep")) ||
    (colspecs && nameStart ? getColspecStartRowsep(colspecs, nameStart) : null) ||
    (tgroup && tgroup.getAttribute("rowsep")) ||
    (table && table.getAttribute("rowsep"));

  return {
    moreRows: cell.getAttribute("morerows"),
    nameStart,
    nameEnd: cell.getAttribute("nameend"),
    colsep,
    rowsep,
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
  wijzigactie: OzonContentWijzigActie | undefined;
}> = ({ context: { mapNodeToJsx }, colspecs, cell, wijzigactie }) => {
  const { moreRows, nameStart, nameEnd, colsep, rowsep } = getData(cell, colspecs);

  return (
    <td
      class={clsx(
        { "dso-horizontal-line": rowsep !== "0" },
        { "dso-vertical-line": colsep !== "0" },
        wijzigactieToClassName(wijzigactie),
      )}
      rowSpan={moreRows ? parseInt(moreRows, 10) + 1 : undefined}
      colSpan={colspecs && nameStart && nameEnd ? getColspan(colspecs, nameStart, nameEnd) : undefined}
    >
      <WrapWijzigactie wijzigactie={wijzigactie}>{mapNodeToJsx(cell.childNodes)}</WrapWijzigactie>
    </td>
  );
};
