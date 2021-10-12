import { items } from './tree-view.content';

export interface TreeViewItem<T> {
  reference: T;
  label: string;
  hasItems: boolean;
  items?: TreeViewItem<T>[];
  open?: boolean;
  loading?: boolean;
  icons?: TreeViewItemIcon[];
}

export interface TreeViewItemIcon {
  icon: string;
  label: string;
}

export interface TreeView<T> {
  collection: TreeViewItem<T>[];
  onFetchItems: (e: CustomEvent<any>) => TreeViewItem<T>[];
  onItemOpen: (e: CustomEvent<any>) => void;
  onItemClose: (e: CustomEvent<any>) => void;
}
