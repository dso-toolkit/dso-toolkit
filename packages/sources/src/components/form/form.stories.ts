import { DecoratorFunction } from '@storybook/addons';

import { bindTemplate, StorybookParameters,  } from '../../stories-helpers';

import { formArgsMapper, formArgTypes } from './form.args';

import { inputContent } from './content/input.content';
import { checkboxesContent } from './content/checkboxes.content';
import { Form, FormGroupCheckboxes, FormGroupInput, FormGroupInputDate } from './form.models';
import { formGroupCheckboxesArgsMapper, formGroupCheckboxesArgTypes } from './form-groups/checkboxes/form-group-checkboxes.args';
import { formGroupInputArgsMapper, formGroupInputArgTypes } from './form-groups/input/form-group-input.args';

export interface FormParameters<TemplateFnReturnType> {
  formTemplate: (form: Form<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupDecorator: DecoratorFunction<TemplateFnReturnType>;
  formGroupCheckboxesTemplate: (formGroupCheckboxes: FormGroupCheckboxes<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupInputTemplate: (formGroupInput: FormGroupInput<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType>) => TemplateFnReturnType;
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
    formGroupInputTemplate
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
}
