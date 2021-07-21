import { Button } from "../button/button.models";

export interface DropdownMenu {
  button: Button;
  children: string;
  dropdownAlign: "left" | "right";
  isCheckable: boolean;
}
