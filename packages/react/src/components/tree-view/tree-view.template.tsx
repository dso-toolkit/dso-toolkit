import { TreeView } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoTreeView } from "../..";

export function treeViewTemplate(
  {
    collection,
    onOpenItem,
    onCloseItem,
    onClickItem
  }: TreeView<string>
) {
  return (
    <DsoTreeView
      collection={collection}
      onOpenItem={onOpenItem}
      onCloseItem={onCloseItem}
      onClickItem={onClickItem}
    ></DsoTreeView>
  );
}
