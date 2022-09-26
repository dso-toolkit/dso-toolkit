import { TreeView } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function treeViewTemplate(
  {
    collection,
    dsoOpenItem,
    dsoCloseItem,
    dsoClickItem
  }: TreeView
) {
  return html`
    <dso-tree-view
      .collection=${collection}
      @dsoOpenItem=${dsoOpenItem}
      @dsoCloseItem=${dsoCloseItem}
      @dsoClickItem=${dsoClickItem}
    ></dso-tree-view>
  `;
}
