import { FormGroupCheckboxesArgs } from "../args/form-group-checkboxes.args";

export const checkboxesContent: Omit<FormGroupCheckboxesArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  label: "Checkboxes",
  required: false,
  disabled: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><p>Rich text</p></div>',
  infoFixed: false,
  errorText: "Maak een keuze",
};
