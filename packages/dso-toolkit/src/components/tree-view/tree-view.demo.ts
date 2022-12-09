import { TreeViewItem } from "./tree-view.models.js";
import { items, subItems } from "./tree-view.content.js";

export let collection = items;

export function onOpenItem(path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void): void {
  const actionItem = path[path.length - 1];
  const actionBehaviour = new Map([
    ["item.1.3", { loading: false, loadTime: 250 }],
    ["item.1.4", { loading: true, loadTime: 2500 }],
  ]).get(actionItem.id);

  if (actionBehaviour && actionItem.hasItems && !actionItem.items && !actionItem.loading) {
    collection = updateDeepTree(collection, path, (item) => ({
      ...item,
      open: true,
      loading: actionBehaviour.loading,
    }));

    callback(collection);

    window.setTimeout(() => {
      const newItems = subItems[actionItem.id];
      collection = updateDeepTree(collection, path, (item) => ({
        ...item,
        open: true,
        loading: false,
        items: newItems,
      }));

      callback(collection);
    }, actionBehaviour.loadTime);
  } else {
    collection = updateDeepTree(collection, path, (item) => ({ ...item, open: true }));

    callback(collection);
  }
}

export function onCloseItem(path: TreeViewItem[], callback: (collection: TreeViewItem[]) => void) {
  collection = updateDeepTree(collection, path, (item) => ({ ...item, open: false }));

  callback(collection);
}

export function onClickItem(
  path: TreeViewItem[],
  originalEvent: MouseEvent,
  callback: (collection: TreeViewItem[]) => void
) {
  const currentItem = path.length > 0 ? path[path.length - 1] : null;

  // demo click behaviour: hrefs with wiki:[subject] will open the wikipedia page about [subject] in a new window
  if (currentItem && currentItem?.href?.slice(0, 5) === "wiki:") {
    window.open(`https://nl.wikipedia.org/wiki/${currentItem.href?.slice(5)}`, "_blank");
    originalEvent.preventDefault();
  }

  // set active = false for all items except current item
  collection = updateTree(collection, (item) => ({ ...item, active: item.id === currentItem?.id }));

  callback(collection);
}

export function onFilter(value: string, callback: (collection: TreeViewItem[], resultText: string) => void): void {
  // set selected = false for all items except when value is not empty and label contains text value
  collection = updateTree(collection, (item) => ({
    ...item,
    selected: !!value && item.label.toLowerCase().indexOf(value.toLowerCase()) > -1,
  }));

  const itemCount = openItems(collection, false);

  const resultText = `${itemCount > 0 ? itemCount : "geen"} resulta${itemCount === 1 ? "at" : "ten"} gevonden ${
    value ? ` voor "${value}"` : ""
  }`;

  callback(collection, resultText);
}

/**
 * Updates a single item in a tree view item collection.
 * @param collection {TreeViewItem[]} the collection
 * @param path {TreeViewItem[]} the path to the item that will be changed
 * @param updater the updater function
 */
function updateDeepTree(
  collection: TreeViewItem[],
  path: TreeViewItem[],
  updater: (item: TreeViewItem) => TreeViewItem
): TreeViewItem[] {
  const item = collection.find((item) => item.id === path[0].id);

  return collection.map((root) => {
    if (root !== item) {
      return root;
    }

    if (path.length === 1) {
      return updater(item);
    }

    if (root === item) {
      return {
        ...item,
        items: item.items ? updateDeepTree(item.items, path.slice(1), updater) : item.items,
      };
    }

    throw new Error("Updating items collection encountered an error.");
  });
}

/**
 * Updates all items in a tree view item collection.
 * @param collection {TreeViewItem[]} the collection
 * @param updater the updater function
 */
function updateTree(collection: TreeViewItem[], updater: (item: TreeViewItem) => TreeViewItem): TreeViewItem[] {
  return collection.map((root) => {
    const item = updater(root);
    return {
      ...item,
      items: item.items ? updateTree(item.items, updater) : item.items,
    };
  });
}

/**
 * Opens all items in a tree view item collection that has a descendant with selected state.
 * @param collection {TreeViewItem[]} the collection
 * @param collapse {boolean} if true items with no selected descendants will be closed
 */
function openItems(collection: TreeViewItem[], collapse: boolean): number {
  const flatten = (data: TreeViewItem[] | undefined, level: number): Array<{ level: number; item: TreeViewItem }> =>
    data ? data.flatMap((item) => [{ level, item }, ...flatten(item.items, level + 1)]) : [];

  const list: Array<{ level: number; item: TreeViewItem }> = flatten(collection, 0).reverse();

  const levelOpen: boolean[] = [];

  list.forEach((row) => {
    if (levelOpen[row.level + 1]) {
      row.item.open = true;
      levelOpen[row.level + 1] = false;
    } else if (collapse) {
      row.item.open = false;
    }

    if (row.item.selected || row.item.open) {
      levelOpen[row.level] = true;
    }
  });

  return list.filter((row) => row.item.selected).length;
}
