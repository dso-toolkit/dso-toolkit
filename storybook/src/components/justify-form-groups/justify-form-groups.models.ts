import { Button } from "../button/button.models.js";
import { FormGroup } from "../form-group/form-group.models.js";

export interface JustifyFormGroups<TemplateFnReturnType> {
  formGroups: FormGroup<TemplateFnReturnType>[];
  buttons: Button[];
}
