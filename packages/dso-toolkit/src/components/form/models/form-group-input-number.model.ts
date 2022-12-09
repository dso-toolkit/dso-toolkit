import { FormGroupBase } from "./form-group.base-model.js";

export interface FormGroupInputNumber<TemplateFnReturnType> extends FormGroupBase<TemplateFnReturnType> {
  group: "input-number";
  id: string;
  min?: number;
  max?: number;
  count: number;
  minusButtonInactive: boolean;
  plusButtonInactive: boolean;
}
