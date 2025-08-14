import { SelectOption, SelectOptionGroup } from "./form-group-select.models";

export const selectOptionsContent: SelectOption[] = [
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

export const selectOptionGroupContent: SelectOptionGroup[] = [
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
