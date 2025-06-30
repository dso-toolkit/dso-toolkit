import { FormGroupStaticArgs } from "./form-group-static.args";

export const staticContent: Omit<FormGroupStaticArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  label: "Kleur van object",
  value: "rood",
  edit: false,
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
};
