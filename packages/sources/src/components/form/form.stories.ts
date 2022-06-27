import { DecoratorFunction } from '@storybook/addons';

import { bindTemplate, StorybookParameters,  } from '../../stories-helpers';

import { formArgsMapper, formArgTypes } from './form.args';

import { checkboxesContent } from './content/checkboxes.content';
import { confirmContent } from './content/confirm.content';
import { inputContent } from './content/input.content';
import { radiosContent } from './content/radios.content';
import { staticContent } from './content/static.content';
import { textareaContent } from './content/textarea.content';
import { Form, FormGroupCheckboxes, FormGroupConfirm, FormGroupInput, FormGroupInputDate, FormGroupRadios, FormGroupStatic, FormGroupTextarea } from './form.models';
import { formGroupCheckboxesArgsMapper, formGroupCheckboxesArgTypes } from './form-groups/checkboxes/form-group-checkboxes.args';
import { formGroupConfirmArgsMapper, formGroupConfirmArgTypes } from './form-groups/confirm/form-group-confirm.args';
import { formGroupInputArgsMapper, formGroupInputArgTypes } from './form-groups/input/form-group-input.args';
import { formGroupRadiosArgsMapper, formGroupRadiosArgTypes } from './form-groups/radios/form-group-radios.args';
import { formGroupStaticArgsMapper, formGroupStaticArgTypes } from './form-groups/static/form-group-static.args';
import { formGroupTextareaArgsMapper, formGroupTextareaArgTypes } from './form-groups/textarea/form-group-textarea.args';


export interface FormParameters<TemplateFnReturnType> {
  formTemplate: (form: Form<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupDecorator: DecoratorFunction<TemplateFnReturnType>;
  formGroupCheckboxesTemplate: (formGroupCheckboxes: FormGroupCheckboxes<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupConfirmTemplate: (formGroupConfirm: FormGroupConfirm<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupInputTemplate: (formGroupInput: FormGroupInput<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupRadiosTemplate: (formGroupRadios: FormGroupRadios<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupStaticTemplate: (formGroupStatic: FormGroupStatic<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupTextareaTemplate: (formGroupTextarea: FormGroupTextarea<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfForm<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    formTemplate,
    formGroupDecorator,
    formGroupCheckboxesTemplate,
    formGroupConfirmTemplate,
    formGroupInputTemplate,
    formGroupRadiosTemplate,
    formGroupStaticTemplate,
    formGroupTextareaTemplate
  }: FormParameters<TemplateFnReturnType>
) {
  storiesOf('Form/form', mainModule)
    .addParameters({
      argTypes: formArgTypes,
      docs: {
        page: readme
      }
    })
    .add('form', bindTemplate(formArgsMapper, formTemplate)
  );

  storiesOf('Form/groups/checkboxes', mainModule)
    .addParameters({
      argTypes: formGroupCheckboxesArgTypes,
      args: checkboxesContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('checkboxes', bindTemplate(formGroupCheckboxesArgsMapper, formGroupCheckboxesTemplate)
  );

  storiesOf('Form/groups/confirm', mainModule)
    .addParameters({
      argTypes: formGroupConfirmArgTypes,
      args: confirmContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('confirm', bindTemplate(formGroupConfirmArgsMapper, formGroupConfirmTemplate)
  );

  storiesOf('Form/groups/input', mainModule)
    .addParameters({
      argTypes: formGroupInputArgTypes,
      args: inputContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('input', bindTemplate(formGroupInputArgsMapper, formGroupInputTemplate)
  );

  storiesOf('Form/groups/radios', mainModule)
    .addParameters({
      argTypes: formGroupRadiosArgTypes,
      args: radiosContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('radios', bindTemplate(formGroupRadiosArgsMapper, formGroupRadiosTemplate)
  );

  storiesOf('Form/groups/static', mainModule)
    .addParameters({
      argTypes: formGroupStaticArgTypes,
      args: staticContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('static', bindTemplate(formGroupStaticArgsMapper, formGroupStaticTemplate)
  );

  storiesOf('Form/groups/textarea', mainModule)
    .addParameters({
      argTypes: formGroupTextareaArgTypes,
      args: textareaContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('textarea', bindTemplate(formGroupTextareaArgsMapper, formGroupTextareaTemplate)
  );}
