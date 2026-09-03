import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupStatic<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "static";
  edit?: boolean;
  value: string;
}
