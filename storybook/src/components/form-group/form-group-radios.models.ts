import { Selectable } from "../selectable/selectable.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupRadios extends FormGroupBase {
  group: "radios";
  inline?: boolean;
  selectables: Selectable[];
}
