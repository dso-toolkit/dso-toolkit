import { FormGroupRadiosArgs } from "../args/form-group-radios.args.js";

export const radiosContent: Omit<FormGroupRadiosArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  label: "Radios",
  required: false,
  disabled: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
  errorText: "Maak een keuze",
};
