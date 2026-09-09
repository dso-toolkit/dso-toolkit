import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupStatic extends FormGroupBase {
  group: "static";
  edit?: boolean;
  value: string;
}
