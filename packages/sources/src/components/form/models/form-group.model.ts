import { FormGroupRadios } from './form-group-radios.model';
import { FormGroupCheckboxes } from './form-group-checkboxes.model';
import { FormGroupInput, FormGroupInputDate } from './form-group-input.model';

export type FormGroup<TemplateFnReturnType> = FormGroupCheckboxes<TemplateFnReturnType> | FormGroupInput<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType> | FormGroupRadios<TemplateFnReturnType>;
