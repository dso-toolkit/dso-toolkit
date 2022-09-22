import { TreeView } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function treeViewTemplate(
  {
    collection,
    onOpenItem,
    onCloseItem,
    onClickItem
  }: TreeView
) {
  return html`
    <dso-tree-view
      .collection=${collection}
      @dsoOpenItem=${onOpenItem}
      @dsoCloseItem=${onCloseItem}
      @dsoClickItem=${onClickItem}
    ></dso-tree-view>
  `;
}
