import { DropdownMenuGroup, JustifyFormGroups } from "dso-toolkit";
import { TemplateResult } from "lit-html";

export const dropdownItems: DropdownMenuGroup[] = [
  {
    items: [
      {
        label: "Adres",
        type: "button",
      },
      {
        label: "Postcode en huisnummer",
        type: "button",
      },
      {
        label: "Kadastraal nummer",
        type: "button",
      },
      {
        label: "Coordinaten",
        type: "button",
      },
      {
        label: "Teken een gebied op de kaart",
        type: "button",
      },
    ],
  },
];

export const formGroup: JustifyFormGroups<TemplateResult> = {
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
  buttons: [{ label: "Zoeken", type: "button", variant: "secondary", modifier: "dso-small" }],
};
