import { FormGroupStaticArgs } from "../args/form-group-static.args.js";

export const staticContent: Omit<FormGroupStaticArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  label: "Kleur van object",
  value: "rood",
  edit: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><p>Rich text</p></div>',
  infoFixed: false,
};
