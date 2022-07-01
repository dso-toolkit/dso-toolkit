import { storiesOfForm } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

import { formGroupCheckboxesTemplate } from './form-groups/checkboxes/form-group-checkboxes.template';
import { formGroupConfirmTemplate } from './form-groups/confirm/form-group-confirm.template';
import { formGroupInputTemplate } from './form-groups/input/form-group-input.template';
import { formGroupInputNumberTemplate } from './form-groups/input-number/form-group-input-number.template';
import { formGroupRadiosTemplate } from './form-groups/radios/form-group-radios.template';
import { formGroupSelectTemplate } from './form-groups/select/form-group-select.template';
import { formGroupStaticTemplate } from './form-groups/static/form-group-static.template';
import { formGroupTextareaTemplate } from './form-groups/textarea/form-group-textarea.template';

import { formTemplate } from './form.template';
import readme from './readme.md';

storiesOfForm(
  {
    module,
    storiesOf,
    readme
  },
  {
    formTemplate,
    formGroupDecorator: story => html`<form><fieldset><legend>Example</legend>${story()}</fieldset></form>`,
    formGroupCheckboxesTemplate,
    formGroupConfirmTemplate,
    formGroupInputTemplate,
    formGroupInputNumberTemplate,
    formGroupRadiosTemplate,
    formGroupSelectTemplate,
    formGroupStaticTemplate,
    formGroupTextareaTemplate
  }
);
