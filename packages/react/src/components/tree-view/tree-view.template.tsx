import { TreeView } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoTreeView } from "../..";

export function treeViewTemplate(
  {
    collection,
    dsoOpenItem,
    dsoCloseItem,
    dsoClickItem
  }: TreeView
) {
  return (
    <DsoTreeView
      collection={collection}
      onDsoOpenItem={dsoOpenItem}
      onDsoCloseItem={dsoCloseItem}
      onDsoClickItem={dsoClickItem}
    ></DsoTreeView>
  );
}
