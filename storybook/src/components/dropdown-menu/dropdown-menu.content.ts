import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { DropdownMenuGroup } from "./dropdown-menu.models.js";

export const versions: DropdownMenuGroup[] = [
  {
    id: uuidv4(),
    label: "Versies",
    items: [
      { type: "link", href: "#", label: "10.6.0", dsoClick: fn() },
      { type: "link", href: "#", label: "10.5.0", dsoClick: fn() },
      { type: "link", href: "#", label: "10.4.0", dsoClick: fn() },
    ],
  },
  {
    items: [{ type: "link", href: "#", label: "master", dsoClick: fn() }],
  },
  {
    id: uuidv4(),
    label: "Branch releases",
    items: [
      { type: "link", href: "#", label: "#500-Margins-Testbuilds", dsoClick: fn() },
      { type: "link", href: "#", label: "#611-Pager-component-uitbreiden", checked: true, dsoClick: fn() },
      { type: "link", href: "#", label: "#663-Dropdown-button-toegankelijk-maken", dsoClick: fn() },
    ],
  },
];

export const settings: DropdownMenuGroup[] = [
  {
    items: [
      { type: "button", label: "Bewerken", dsoClick: fn() },
      { type: "button", label: "Verwijderen", dsoClick: fn() },
    ],
  },
];
