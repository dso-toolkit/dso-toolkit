import { Selectable } from "../selectable/selectable.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupConfirm extends Omit<FormGroupBase, "label"> {
  group: "confirm";
  selectable: Selectable;
}
