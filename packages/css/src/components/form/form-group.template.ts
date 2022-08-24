import { FormGroup } from '@dso-toolkit/sources';
import { nothing, TemplateResult } from 'lit-html';

import { formGroupCheckboxesTemplate } from './form-groups/checkboxes/form-group-checkboxes.template';
import { formGroupConfirmTemplate } from './form-groups/confirm/form-group-confirm.template';
import { formGroupFilesTemplate } from './form-groups/files/form-group-files.template';
import { formGroupInputNumberTemplate } from './form-groups/input-number/form-group-input-number.template';
import { formGroupInputTemplate } from './form-groups/input/form-group-input.template';
import { formGroupRadiosTemplate } from './form-groups/radios/form-group-radios.template';
import { formGroupSearchBarTemplate } from './form-groups/search-bar/form-group-search-bar.template';
import { formGroupSelectTemplate } from './form-groups/select/form-group-select.template';
import { formGroupStaticTemplate } from './form-groups/static/form-group-static.template';
import { formGroupTextareaTemplate } from './form-groups/textarea/form-group-textarea.template';

export function formGroupTemplate(formGroup: FormGroup<TemplateResult>) {
  switch (formGroup.group) {
    case 'checkboxes':
      return formGroupCheckboxesTemplate(formGroup);
    case 'confirm':
      return formGroupConfirmTemplate(formGroup);
    case 'files':
      return formGroupFilesTemplate(formGroup);
    case 'input':
      return formGroupInputTemplate(formGroup);
    case 'input-number':
      return formGroupInputNumberTemplate(formGroup);
    case 'radios':
      return formGroupRadiosTemplate(formGroup);
    case 'search-bar':
      return formGroupSearchBarTemplate(formGroup);
    case 'select':
      return formGroupSelectTemplate(formGroup);
    case 'static':
      return formGroupStaticTemplate(formGroup);
    case 'textarea':
      return formGroupTextareaTemplate(formGroup);
    default:
      return nothing;
  }
}
