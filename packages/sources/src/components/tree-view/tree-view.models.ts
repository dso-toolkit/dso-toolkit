export interface TreeViewItem<T> {
  /** The reference of type T */
  reference: T;
  /** The label of the item */
  label: string;
  /** The optional href of the item (creates a link) */
  href?: string;
  /** Indicates whether the item has children */
  hasItems: boolean;
  /** The array of child items */
  items?: TreeViewItem<T>[];
  /** Indicates whether the node is open and child items are shown */
  open?: boolean;
  /** Indicates the node is loading child items */
  loading?: boolean;
  /** An optional array of icons */
  icons?: TreeViewItemIcon[];
}

export interface TreeViewItemIcon {
  /** The icon type */
  icon: string;
  /** The label for the icon */
  label: string;
}

export interface TreeView<T> {
  collection: TreeViewItem<T>[];
  /** Emitted when a node is opened */
  onOpenItem: (e: CustomEvent<TreeViewItem<T>[]>) => void;
  /** Emitted when a node is closed */
  onCloseItem: (e: CustomEvent<TreeViewItem<T>[]>) => void;
  /** Emitted when an item is clicked */
  onClickItem: (e: CustomEvent<TreeViewItem<T>[]>) => void;
}
