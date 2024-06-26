import { TreeView } from "dso-toolkit";
import * as React from "react";

import { DsoTreeView } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactTreeView: ComponentImplementation<TreeView> = {
  component: "treeView",
  implementation: "react",
  template: () =>
    function treeViewTemplate({ collection, dsoOpenItem, dsoCloseItem, dsoClickItem }) {
      return (
        <DsoTreeView
          collection={collection}
          onDsoOpenItem={dsoOpenItem}
          onDsoCloseItem={dsoCloseItem}
          onDsoClickItem={dsoClickItem}
        ></DsoTreeView>
      );
    },
};
