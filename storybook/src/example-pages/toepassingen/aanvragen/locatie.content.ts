import { fn } from "storybook/test";

import { DropdownMenuGroup } from "../../../components/dropdown-menu/dropdown-menu.models.js";
import { JustifyFormGroups } from "../../../components/justify-form-groups/justify-form-groups.models.js";

export function dropdownItems(): DropdownMenuGroup[] {
  return [
    {
      items: [
        {
          label: "Adres",
          type: "button",
          dsoClick: fn(),
        },
        {
          label: "Postcode en huisnummer",
          type: "button",
          dsoClick: fn(),
        },
        {
          label: "Kadastraal nummer",
          type: "button",
          dsoClick: fn(),
        },
        {
          label: "Coordinaten",
          type: "button",
          dsoClick: fn(),
        },
        {
          label: "Teken een gebied op de kaart",
          type: "button",
          dsoClick: fn(),
        },
      ],
    },
  ];
}

export function formGroup(): JustifyFormGroups {
  return {
    formGroups: [
      {
        group: "select",
        id: "type",
        label: "Type",
        items: [
          {
            label: "",
            options: [
              { label: "RD", value: "rd" },
              { label: "WGS84", value: "wgs84", selected: true },
            ],
          },
        ],
      },
      {
        group: "input",
        type: "text",
        id: "locatie--latt",
        label: "Lattitude",
        value: "52.07066496",
      },
      {
        group: "input",
        type: "text",
        id: "locatie--long",
        label: "Longitude",
        value: "4.26389251",
      },
    ],
    buttons: [{ label: "Zoeken", type: "button", variant: "secondary", compact: true }],
  };
}
