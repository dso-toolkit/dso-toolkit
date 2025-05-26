import { Selectable } from "../../selectable/selectable.models";
import { FormGroupBase } from "../form-group.base-model";

export interface FormGroupCheckboxes<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "checkboxes";
  selectables: Selectable<TemplateFnReturnType>[];
}
