export interface TreeViewItem {
  /** The id of the item */
  id: string;
  /** The label of the item */
  label: string;
  /** The optional href of the item (creates a link) */
  href?: string;
  /** Indicates whether the item has children */
  hasItems: boolean;
  /** The array of child items */
  items?: TreeViewItem[];
  /** Indicates whether the node is open and child items are shown */
  open?: boolean;
  /** Indicates the node is loading child items */
  loading?: boolean;
  /** Indicates the node is active, only one item should be active */
  active?: boolean;
  /** Indicates the node is selected, multiple items can be selected */
  selected?: boolean;
  /** An optional array of icons */
  icons?: TreeViewItemIcon[];
}

export interface TreeViewItemIcon {
  /** The icon type */
  icon: string;
  /** The label for the icon */
  label: string;
}

export interface TreeViewPointerEvent {
  /** The path to the clicked item */
  path: TreeViewItem[],
  /** The original pointer event */
  originalEvent: MouseEvent
}

export interface TreeView {
  collection: TreeViewItem[];
  /** Emitted when a node is opened */
  dsoOpenItem: (e: CustomEvent<TreeViewItem[]>) => void;
  /** Emitted when a node is closed */
  dsoCloseItem: (e: CustomEvent<TreeViewItem[]>) => void;
  /** Emitted when an item is clicked */
  dsoClickItem: (e: CustomEvent<TreeViewPointerEvent>) => void;
}
