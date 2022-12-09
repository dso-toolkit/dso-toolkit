import { Button } from "../button/button.models.js";
import { FormGroup } from "../form/models/form-group.model.js";

export interface JustifyFormGroups<TemplateFnReturnType> {
  formGroups: FormGroup<TemplateFnReturnType>[];
  buttons: Button[];
}
