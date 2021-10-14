import { TreeView } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function treeViewTemplate(
  {
    collection,
    onOpenItem,
    onCloseItem
  }: TreeView<string>
) {
  return html`
    <dso-tree-view
      .collection=${collection}
      @openItem=${onOpenItem}
      @closeItem=${onCloseItem}
    ></dso-tree-view>
  `;
}
