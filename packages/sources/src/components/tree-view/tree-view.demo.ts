import { TreeViewItem } from './tree-view.models';
import { items, subItems } from './tree-view.content';

export namespace TreeViewDemo {
  export let collection = items;

  export function onOpenItem(path: TreeViewItem<string>[], callback: (collection: TreeViewItem<string>[]) => void): void {
    const actionItem = path[path.length - 1];
    const actionBehaviour = new Map(
      [
        ['item.1.3', { loading: false, loadTime: 250 }],
        ['item.1.4', { loading: true, loadTime: 2500 }]
      ]
    ).get(actionItem.reference);

    if (actionBehaviour && actionItem.hasItems && !actionItem.items && !actionItem.loading) {
      collection = updateDeepTree(
        collection,
        path,
        item => ({ ...item, open: true, loading: actionBehaviour.loading })
      );

      callback(collection);

      window.setTimeout(() => {
        const newItems = subItems[actionItem.reference];
        collection = updateDeepTree(
          collection,
          path,
          item => ({ ...item, open: true, loading: false, items: newItems })
        );

        callback(collection);
      }, actionBehaviour.loadTime);
    }
    else {
      collection = updateDeepTree(
        collection,
        path,
        item => ({ ...item, open: true })
      );

      callback(collection);
    }
  }

  export function onCloseItem(path: TreeViewItem<string>[], callback: (collection: TreeViewItem<string>[]) => void) {
    collection = updateDeepTree(
      collection,
      path,
      item => ({ ...item, open: false })
    );

    callback(collection);
  }

  function updateDeepTree(
    collection: TreeViewItem<string>[],
    path: TreeViewItem<string>[],
    updater: (item: TreeViewItem<string>) => TreeViewItem<string>
  ): TreeViewItem<string>[] {
    const item = collection.find(item => item.reference === path[0].reference);

    return collection.map(root => {
      if (root !== item) {
        return root;
      }

      if (path.length === 1) {
        return updater(item);
      }

      if (root === item) {
        return {
          ...item,
          items: item.items ? updateDeepTree(item.items, path.slice(1), updater) : item.items
        };
      }

      throw new Error('Updating items collection encountered an error.');
    });
  }
}
