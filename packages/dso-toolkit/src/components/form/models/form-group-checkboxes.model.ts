import { Selectable } from "../../selectable/selectable.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupCheckboxes<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "checkboxes";
  selectables: Selectable<TemplateFnReturnType>[];
}
