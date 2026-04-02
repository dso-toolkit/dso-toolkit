import { FunctionalComponent } from "@stencil/core";
import { h } from "@stencil/core/internal";
import { clsx } from "clsx";

import {
  Wijzigactie,
  WrapWijzigactie,
} from "../../../../functional-components/wrap-wijzigactie/wrap-wijzigactie.functional-component";
import { wijzigactieToClassName } from "../../functions/wijzigactie-to-class-name.function";
import { OzonContentNodeContext } from "../../ozon-content-node-context.interface";

import { Colspecs } from "./colspec/colspec.interface";
import { getColspan, getData } from "./table-cell";

export const Header: FunctionalComponent<{
  context: OzonContentNodeContext;
  colspecs: Colspecs | undefined;
  cell: Element;
  wijzigactie: Wijzigactie | undefined;
}> = ({ context: { mapNodeToJsx }, colspecs, cell, wijzigactie }) => {
  const { moreRows, nameStart, nameEnd, colsep, rowsep } = getData(cell, colspecs);

  return (
    <th
      class={clsx(
        { "dso-horizontal-line": rowsep !== "0" },
        { "dso-vertical-line": colsep !== "0" },
        wijzigactieToClassName(wijzigactie),
      )}
      rowSpan={moreRows ? parseInt(moreRows, 10) + 1 : undefined}
      colSpan={colspecs && nameStart && nameEnd ? getColspan(colspecs, nameStart, nameEnd) : undefined}
    >
      <WrapWijzigactie wijzigactie={wijzigactie}>{mapNodeToJsx(cell.childNodes)}</WrapWijzigactie>
    </th>
  );
};
