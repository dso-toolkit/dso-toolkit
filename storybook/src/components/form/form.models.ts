import { FormButtons } from "../form-buttons/form-buttons.models.js";
import { FormGroup } from "../form-group/form-group.models.js";

export interface Form {
  asteriskExplanation?: FormAsteriskExplanationPosition;
  mode?: "vertical" | "horizontal";
  formModifier?: string;
  content: FormContent;
  formButtons?: FormButtons;
  dsoSubmit?: (event: SubmitEvent) => void;
}

export type FormAsteriskExplanationPosition = "top" | "bottom" | "both";

export interface FormGroupCollection {
  title: string;
  headingLevel?: FormGroupCollectionHeadingLevel;
  formGroups: FormGroup[];
}

export type FormContent = FormGroup[] | FormGroupCollection[];

export type FormGroupCollectionHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
