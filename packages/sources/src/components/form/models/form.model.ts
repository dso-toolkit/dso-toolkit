import { FormGroup } from "./form-group.model";

export interface Form<TemplateFnReturnType> {
  legend?: string;
  legendHeading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | undefined;
  mode?: "vertical" | "horizontal";
  formGroups: FormGroup<TemplateFnReturnType>[] | TemplateFnReturnType;
}
