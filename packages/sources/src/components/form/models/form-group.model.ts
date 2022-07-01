import { FormGroupCheckboxes } from './form-group-checkboxes.model';
import { FormGroupConfirm } from './form-group-confirm.model';
import { FormGroupInput, FormGroupInputDate } from './form-group-input.model';
import { FormGroupInputNumber } from './form-group-input-number.model';
import { FormGroupRadios } from './form-group-radios.model';
import { FormGroupStatic } from './form-group-static.model';
import { FormGroupTextarea } from './form-group-textarea.model';

export type FormGroup<TemplateFnReturnType> = FormGroupCheckboxes<TemplateFnReturnType> | FormGroupConfirm<TemplateFnReturnType> | FormGroupInput<TemplateFnReturnType> | FormGroupInputNumber<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType> | FormGroupRadios<TemplateFnReturnType> | FormGroupTextarea<TemplateFnReturnType>;
