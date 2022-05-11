import { FormGroupInput, FormGroupInputDate } from './form-group-input.model';

export type FormGroup<TemplateFnReturnType> = FormGroupInput<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType>;
