import { SelectOption, SelectOptionGroup } from "./form-group-select.models.js";

export function selectOptionsContent(): SelectOption[] {
  return [
    {
      value: "be",
      label: "België",
    },
    {
      value: "nl",
      selected: true,
      label: "Nederland",
    },
    {
      value: "lux",
      label: "Luxemburg",
    },
  ];
}

export function selectOptionGroupContent(): SelectOptionGroup[] {
  return [
    {
      label: "Vlees",
      options: [
        {
          value: "worst",
          label: "Worst",
        },
        {
          value: "salami",
          selected: true,
          label: "Salami",
        },
        {
          value: "geit",
          label: "Geit",
        },
      ],
    },
    {
      label: "Vis",
      disabled: true,
      options: [
        {
          value: "zalm",
          label: "Zalm",
        },
        {
          value: "makreel",
          label: "Makreel",
        },
      ],
    },
  ];
}
