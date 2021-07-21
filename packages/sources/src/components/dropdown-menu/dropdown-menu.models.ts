import { Button } from "../button/button.models";

export interface DropdownMenu<TemplateFnReturnType> {
  button: Button;
  children: TemplateFnReturnType;
  dropdownAlign?: 'left' | 'right';
  isCheckable?: boolean;
}

export interface DropdownMenuGroup {
  header?: string;
  items: (DropdownMenuItemAnchor | DropdownMenuItemButton)[];
}

export interface DropdownMenuItemAnchor {
  type: 'anchor';
  url: string;
  label: string;
}

export interface DropdownMenuItemButton {
  type: 'button';
  label: string;
}
