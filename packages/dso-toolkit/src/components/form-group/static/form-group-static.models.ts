import { FormGroupBase } from "../form-group.base-model";

export interface FormGroupStatic<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "static";
  edit?: boolean;
  value: string;
}
