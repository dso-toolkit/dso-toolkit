import { Selectable } from "../selectable/selectable.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupCheckboxes extends FormGroupBase {
  group: "checkboxes";
  selectables: Selectable[];
}
