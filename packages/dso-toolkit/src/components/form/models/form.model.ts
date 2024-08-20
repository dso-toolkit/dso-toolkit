import { FormButtons } from "../../form-buttons/form-buttons.models.js";
import { FormGroup } from "./form-group.model.js";

export interface Form<TemplateFnReturnType> {
  asteriskExplanation?: FormAsteriskExplanationPosition;
  mode?: "vertical" | "horizontal";
  formGroups: FormGroup<TemplateFnReturnType>[] | TemplateFnReturnType;
  formButtons?: FormButtons;
}

export type FormAsteriskExplanationPosition = "top" | "bottom" | "both";
