import { TreeView } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function treeViewTemplate(
  {
    collection,
    onOpenItem,
    onCloseItem,
    onClickItem
  }: TreeView<string>
) {
  return html`
    <dso-tree-view
      .collection=${collection}
      @openItem=${onOpenItem}
      @closeItem=${onCloseItem}
      @clickItem=${onClickItem}
    ></dso-tree-view>
  `;
}
