import { FormGroupInputArgs } from "./form-group-input.args";

export const inputContent: Omit<FormGroupInputArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  type: "text",
  label: 'Vul "een waarde" in',
  value: "een waarde",
  required: false,
  disabled: false,
  readonly: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
};
