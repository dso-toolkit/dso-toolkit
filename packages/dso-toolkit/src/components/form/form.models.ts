import { FormButtons } from "../form-buttons/form-buttons.models.js";
import { FormGroup } from "../form-group/form-group.models.js";

export interface Form<TemplateFnReturnType> {
  asteriskExplanation?: FormAsteriskExplanationPosition;
  mode?: "vertical" | "horizontal";
  content: FormContent<TemplateFnReturnType>;
  formButtons?: FormButtons;
}

export type FormAsteriskExplanationPosition = "top" | "bottom" | "both";

export interface FormGroupCollection<TemplateFnReturnType> {
  title: string;
  headingLevel?: FormGroupCollectionHeadingLevel;
  formGroups: FormGroup<TemplateFnReturnType>[];
}

export type FormContent<TemplateFnReturnType> =
  | FormGroup<TemplateFnReturnType>[]
  | FormGroupCollection<TemplateFnReturnType>[];

export type FormGroupCollectionHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
