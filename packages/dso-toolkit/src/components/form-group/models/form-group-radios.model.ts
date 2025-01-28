import { Selectable } from "../../selectable/selectable.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupRadios<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "radios";
  inline?: boolean;
  selectables: Selectable<TemplateFnReturnType>[];
}
