import { html } from "lit-html";

import { TreeView } from "./tree-view.models.js";

export function treeViewTemplate({ collection, dsoOpenItem, dsoCloseItem, dsoClickItem }: TreeView) {
  return html`
    <dso-tree-view
      .collection=${collection}
      @dsoOpenItem=${dsoOpenItem}
      @dsoCloseItem=${dsoCloseItem}
      @dsoClickItem=${dsoClickItem}
    ></dso-tree-view>
  `;
}
