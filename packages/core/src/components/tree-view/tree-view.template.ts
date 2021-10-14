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
          const actionBehaviour = new Map([
            [ 'item.1.3', { loading: false, loadTime: 250 }],
            [ 'item.1.4', { loading: true, loadTime: 2500 }]
          ]).get(actionItem.reference);

          if (actionItem.hasItems && !actionItem.items && !actionItem.loading) {
            treeView.collection = treeView.updateItems(
              treeView.collection,
              e.detail,
              (item) => ({ ...item, open: true, loading: actionBehaviour.loading }));

            window.setTimeout(() => {
              const newItems = onFetchItems()[actionItem.reference];
              treeView.collection = treeView.updateItems(
                treeView.collection,
                e.detail,
                (item) => ({ ...item, open: true, loading: false, items: newItems }));
              }, actionBehaviour.loadTime);
          }
        });
      })();
    </script>
  `;
}
