import { Button } from "../button/button.models";
import { FormGroup } from "../form/models/form-group.model";

export interface JustifyFormGroups<TemplateFnReturnType> {
  formGroups: FormGroup<TemplateFnReturnType>[];
  buttons: Button[];
}
