export interface DropdownMenuInternalState {
  checkable: boolean;
}

export type DropdownMenuTabbable = HTMLDsoDropdownMenuElement | HTMLDsoDropdownMenuItemElement;

export type DropdownMenuItemType = "button" | "link";

export interface DropdownMenuItemClickEvent {
  originalEvent: MouseEvent;
  /** True when the user clicked the Dropdown Menu Item while holding Ctrl, Alt or other modifiers, or when the card is right-clicked. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
