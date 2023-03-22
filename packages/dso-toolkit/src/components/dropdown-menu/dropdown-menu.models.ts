import { Button } from "../button/button.models.js";

export const dropdownMenuStrategy = ["auto", "absolute", "fixed"] as const;

export interface DropdownMenu {
  id: string;
  button: Button;
  groups: DropdownMenuGroup[];
  dropdownAlign?: "left" | "right";
  isCheckable?: boolean;
  boundary?: string;
  strategy?: typeof dropdownMenuStrategy[number];
}

export interface DropdownMenuGroup {
  id?: string;
  header?: string;
  items: Array<DropdownMenuItem & (DropdownMenuItemAnchor | DropdownMenuItemButton)>;
}

export interface DropdownMenuItem {
  label: string;
  checked?: boolean;
}

export interface DropdownMenuItemAnchor {
  type: "anchor";
  url: string;
}

export interface DropdownMenuItemButton {
  type: "button";
}
