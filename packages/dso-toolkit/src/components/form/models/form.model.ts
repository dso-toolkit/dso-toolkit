import { FormButtons } from "../../form-buttons/form-buttons.models.js";
import { FormGroup } from "./form-group.model.js";

export interface Form<TemplateFnReturnType> {
  asteriskExplanation?: FormAsteriskExplanationPosition;
  mode?: "vertical" | "horizontal";
  content: FormGroup<TemplateFnReturnType>[] | FormGroupCollection<TemplateFnReturnType>[];
  formButtons?: FormButtons;
}

export type FormAsteriskExplanationPosition = "top" | "bottom" | "both";

export interface FormGroupCollection<TemplateFnReturnType> {
  title: string;
  formGroups: FormGroup<TemplateFnReturnType>[];
}
