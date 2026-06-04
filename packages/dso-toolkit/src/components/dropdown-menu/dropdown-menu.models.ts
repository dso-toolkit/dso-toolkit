import { Button } from "../button/button.models.js";

export interface DropdownMenu {
  id: string; // Remove in #3316
  button: Button; // Remove in #3316
  label: string;
  variant: "primary" | "secondary" | "tertiary";
  checkable?: boolean;
  groups: DropdownMenuGroup[];
  dropdownAlign?: "left" | "right";
}

export interface DropdownMenuGroup {
  id?: string; // Remove in #3316
  label?: string;
  items: DropdownMenuItemLink[] | DropdownMenuItemButton[];
}

export interface DropdownMenuItemClickEvent {
  originalEvent: MouseEvent;
  /** True when the user clicked the Dropdown Menu Item while holding Ctrl, Alt or other modifiers, or when the card is right-clicked. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}

interface DropdownMenuItem {
  label: string;
  checked?: boolean;
  dsoClick: (e: CustomEvent<DropdownMenuItemClickEvent>) => void;
}

export interface DropdownMenuItemLink extends DropdownMenuItem {
  type: "link";
  href: string;
}

export interface DropdownMenuItemButton extends DropdownMenuItem {
  type: "button";
}
