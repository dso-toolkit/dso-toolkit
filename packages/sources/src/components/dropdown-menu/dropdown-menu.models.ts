import { Button } from "../button/button.models";

export interface DropdownMenu<TemplateFnReturnType> {
  id: string;
  button: Button;
  children: TemplateFnReturnType;
  dropdownAlign?: 'left' | 'right';
  isCheckable?: boolean;
}

export interface DropdownMenuGroup {
  header?: string;
  items: Array<DropdownMenuItem & (DropdownMenuItemAnchor | DropdownMenuItemButton)>;
}

export interface DropdownMenuItem {
  label: string;
  checked?: boolean;
}

export interface DropdownMenuItemAnchor {
  type: 'anchor';
  url: string;
}

export interface DropdownMenuItemButton {
  type: 'button';
}
