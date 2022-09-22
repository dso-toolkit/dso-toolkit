import { TreeView } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoTreeView } from "../..";

export function treeViewTemplate(
  {
    collection,
    onOpenItem,
    onCloseItem,
    onClickItem
  }: TreeView
) {
  return (
    <DsoTreeView
      collection={collection}
      onDsoOpenItem={onOpenItem}
      onDsoCloseItem={onCloseItem}
      onDsoClickItem={onClickItem}
    ></DsoTreeView>
  );
}
