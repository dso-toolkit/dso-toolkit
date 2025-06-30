import { FormGroupCheckboxesArgs } from "./form-group-checkboxes.args";

export const checkboxesContent: Omit<FormGroupCheckboxesArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  label: "Checkboxes",
  required: false,
  disabled: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
  errorText: "Maak een keuze",
};
