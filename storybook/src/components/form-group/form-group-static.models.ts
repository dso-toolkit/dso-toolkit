import { TemplateResult } from "lit-html";

import { FormGroupBase } from "./form-group.base-model.js";

// Tijdelijk: de varianten bestaan alleen om ze in #4022 met een schermlezer te kunnen vergelijken.
export type FormGroupStaticVariant =
  | "huidig"
  | "term-details"
  | "term-labelledby"
  | "group"
  | "fieldset"
  | "dl"
  | "span"
  | "sr-only"
  | "output"
  | "readonly";

export interface FormGroupStatic extends FormGroupBase {
  group: "static";
  edit?: boolean;
  value: string | TemplateResult;
  variant?: FormGroupStaticVariant;
}
