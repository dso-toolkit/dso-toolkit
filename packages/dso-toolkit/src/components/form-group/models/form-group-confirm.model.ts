import { Selectable } from "../../selectable/selectable.models.js";

import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupConfirm<TemplateFnReturnType> extends Omit<FormGroupBase<TemplateFnReturnType>, "label"> {
  group: "confirm";
  selectable: Selectable<TemplateFnReturnType>;
}
