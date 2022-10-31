import { Selectable } from "../../selectable/selectable.models";

import { FormGroupBase } from "./form-group.base-model";

export interface FormGroupConfirm<TemplateFnReturnType> extends Omit<FormGroupBase<TemplateFnReturnType>, "label"> {
  group: "confirm";
  selectable: Selectable<TemplateFnReturnType>;
}
