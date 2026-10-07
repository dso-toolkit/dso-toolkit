import { Fragment, FunctionalComponent, h } from "@stencil/core";

import { Colspecs } from "./colspec/colspec.interface";

export const Colgroup: FunctionalComponent<{ colspecs: Colspecs }> = ({ colspecs }) =>
  colspecs.columns.length > 0 ? (
    <colgroup>
      {colspecs.columns.map((colspec) => (
        <col style={{ width: colspec.width }} />
      ))}
    </colgroup>
  ) : (
    <Fragment />
  );
