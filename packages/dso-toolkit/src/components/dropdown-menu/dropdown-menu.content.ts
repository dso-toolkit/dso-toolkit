import { v4 as uuidv4 } from "uuid";

import { DropdownMenuGroup } from "./dropdown-menu.models.js";

export const versions: DropdownMenuGroup[] = [
  {
    id: uuidv4(),
    header: "Versies",
    items: [
      { type: "anchor", url: "#", label: "10.6.0" },
      { type: "anchor", url: "#", label: "10.5.0" },
      { type: "anchor", url: "#", label: "10.4.0" },
    ],
  },
  {
    items: [{ type: "anchor", url: "#", label: "master" }],
  },
  {
    id: uuidv4(),
    header: "Branch releases",
    items: [
      { type: "anchor", url: "#", label: "#500-Margins-Testbuilds" },
      { type: "anchor", url: "#", label: "#611-Pager-component-uitbreiden", checked: true },
      { type: "anchor", url: "#", label: "#663-Dropdown-button-toegankelijk-maken" },
    ],
  },
];

export const settings: DropdownMenuGroup[] = [
  {
    items: [
      {
        type: "button",
        label: "Bewerken",
      },
      {
        type: "button",
        label: "Verwijderen",
      },
    ],
  },
];
