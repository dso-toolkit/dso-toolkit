import { bindTemplate, StorybookParameters,  } from '../../stories-helpers';

import { formArgsMapper, formArgTypes } from './form.args';
import {  } from './content/form.content';
import { Form, FormGroupInput, FormGroupInputDate } from './form.models';
import { formGroupInputArgsMapper, formGroupInputArgTypes } from './form-groups/input/form-group-input.args';
import { inputContent } from './content/input.content';
import { DecoratorFunction } from '@storybook/addons';

export interface FormParameters<TemplateFnReturnType> {
  formTemplate: (form: Form<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupDecorator: DecoratorFunction<TemplateFnReturnType>;
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
}
