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
  onOpenItem: (e: CustomEvent<TreeViewItem<T>[]>) => void;
  onCloseItem: (e: CustomEvent<TreeViewItem<T>[]>) => void;
  onClickItem: (e: CustomEvent<TreeViewItem<T>[]>) => void;
}
