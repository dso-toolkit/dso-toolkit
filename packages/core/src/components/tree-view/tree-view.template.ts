import { TreeView } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function treeViewTemplate({
  collection,
  onFetchItems
}: TreeView<string>) {
  return html`
    <dso-tree-view
      id="test"
    ></dso-tree-view>

    <script id="content" .collection=${collection} .onFetchItems=${onFetchItems}>
      (() => {
        const treeView = document.getElementById('test');
        const { collection, onFetchItems } = document.getElementById('content');

        treeView.collection = collection;

        treeView.addEventListener('toggleItem', (e) => {
          treeView.collection = treeView.updateItems(
            treeView.collection,
            e.detail,
            (item) => ({ ...item, open: !item.open }));
        });

        treeView.addEventListener('fetchItems', (e) => {
          const actionItem = e.detail[e.detail.length-1];
          if (actionItem.hasItems && !actionItem.items && !actionItem.loading) {
            window.setTimeout(() => {
              const newItems = onFetchItems();
              treeView.collection = treeView.updateItems(
                treeView.collection,
                e.detail,
                (item) => ({ ...item, open: true, loading: false, items: newItems }));
              }, 2500);
          }
        });
      })();
    </script>
  `;
}
