import { Selectable } from "../../selectable";
import { FormGroupBase } from "../form-group.base-model";

export interface FormGroupRadios<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "radios";
  inline?: boolean;
  selectables: Selectable<TemplateFnReturnType>[];
}
