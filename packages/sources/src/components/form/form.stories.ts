import { DecoratorFunction } from '@storybook/addons';

import { bindTemplate, StorybookParameters,  } from '../../stories-helpers';

import { formArgsMapper, formArgTypes } from './form.args';

import { inputContent } from './content/input.content';
import { checkboxesContent } from './content/checkboxes.content';
import { radiosContent } from './content/radios.content';
import { Form, FormGroupCheckboxes, FormGroupInput, FormGroupRadios, FormGroupInputDate } from './form.models';
import { formGroupCheckboxesArgsMapper, formGroupCheckboxesArgTypes } from './form-groups/checkboxes/form-group-checkboxes.args';
import { formGroupInputArgsMapper, formGroupInputArgTypes } from './form-groups/input/form-group-input.args';
import { formGroupRadiosArgsMapper, formGroupRadiosArgTypes } from './form-groups/radios/form-group-radios.args';

export interface FormParameters<TemplateFnReturnType> {
  formTemplate: (form: Form<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupDecorator: DecoratorFunction<TemplateFnReturnType>;
  formGroupCheckboxesTemplate: (formGroupCheckboxes: FormGroupCheckboxes<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupInputTemplate: (formGroupInput: FormGroupInput<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupRadiosTemplate: (formGroupRadios: FormGroupRadios<TemplateFnReturnType>) => TemplateFnReturnType;
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
    formGroupInputTemplate,
    formGroupRadiosTemplate
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
}
