import { FormGroupTextareaArgs } from "../args/form-group-textarea.args.js";

export const textareaContent: Omit<FormGroupTextareaArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
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
