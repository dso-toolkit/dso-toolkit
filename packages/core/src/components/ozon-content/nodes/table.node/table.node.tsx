import { h } from "@stencil/core";

import { OzonContentNodeContext } from "../../ozon-content-node-context.interface";
import { OzonContentNode } from "../../ozon-content-node.interface";

import { mapColspecs } from "./colspec/colspec-mapper";
import { Colgroup } from "./table-colgroup";
import { Rows } from "./table-rows";

function mapData(node: Element) {
  const tgroup = node.querySelector(":scope > tgroup");
  const colAttribute = tgroup?.getAttribute("cols") ?? undefined;
  const columnCount = colAttribute ? parseInt(colAttribute, 10) : undefined;

  return {
    caption: node.querySelector(":scope > title")?.textContent ?? undefined,
    colspecs: tgroup && columnCount ? mapColspecs(columnCount, tgroup.querySelectorAll(":scope > colspec")) : undefined,
    headRows: Array.from(node.querySelectorAll(":scope > tgroup > thead > row")),
    bodyRows: Array.from(node.querySelectorAll(":scope > tgroup > tbody > row")),
  };
}

export class OzonContentTableNode implements OzonContentNode {
  name = "table";

  handles = ["title", "tgroup", "colspec", "thead", "tbody", "row", "cell"];

  render(node: Element, context: OzonContentNodeContext) {
    const { caption, colspecs, headRows, bodyRows } = mapData(node);

    return (
      <dso-table>
        <table class="table">
          {caption && <caption>{caption}</caption>}
          {colspecs && <Colgroup colspecs={colspecs} />}
          {headRows.length > 0 && (
            <thead>
              <Rows rows={headRows} colspecs={colspecs} context={context}></Rows>
            </thead>
          )}
          {bodyRows.length > 0 && (
            <tbody>
              <Rows rows={bodyRows} colspecs={colspecs} context={context}></Rows>
            </tbody>
          )}
        </table>
      </dso-table>
    );
  }
}
