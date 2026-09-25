import { fn } from "storybook/test";

import { DropdownMenuGroup } from "./dropdown-menu.models.js";

export function versions(): DropdownMenuGroup[] {
  return [
    {
      id: "versies",
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
      id: "branch-releases",
      label: "Branch releases",
      items: [
        { type: "link", href: "#", label: "#500-Margins-Testbuilds", dsoClick: fn() },
        { type: "link", href: "#", label: "#611-Pager-component-uitbreiden", checked: true, dsoClick: fn() },
        { type: "link", href: "#", label: "#663-Dropdown-button-toegankelijk-maken", dsoClick: fn() },
      ],
    },
  ];
}

export function settings(): DropdownMenuGroup[] {
  return [
    {
      items: [
        { type: "button", label: "Bewerken", dsoClick: fn() },
        { type: "button", label: "Verwijderen", dsoClick: fn() },
      ],
    },
  ];
}
