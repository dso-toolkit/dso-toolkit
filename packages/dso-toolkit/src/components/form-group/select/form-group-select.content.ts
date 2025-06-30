import { FormGroupSelectArgs } from "./form-group-select.args";
import { SelectOption, SelectOptionGroup } from "./form-group-select.models";

export const selectContent: Omit<FormGroupSelectArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  metOptGroup: false,
  id: "mijn-id",
  label: 'Vul "een waarde" in',
  required: false,
  disabled: false,
  multiple: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
};

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
