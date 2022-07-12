import { DecoratorFunction } from '@storybook/addons';

import { bindTemplate, StorybookParameters,  } from '../../stories-helpers';

import { formArgsMapper, formArgTypes } from './form.args';

import { checkboxesContent } from './content/checkboxes.content';
import { confirmContent } from './content/confirm.content';
import { filesContent } from './content/files.content';
import { inputContent } from './content/input.content';
import { inputNumberContent } from './content/input-number.content';
import { radiosContent } from './content/radios.content';
import { selectContent } from './content/select.content';
import { staticContent } from './content/static.content';
import { searchBarContent } from './content/search-bar.content';
import { textareaContent } from './content/textarea.content';
import { Form, FormGroupCheckboxes, FormGroupConfirm, FormGroupFiles, FormGroupInput, FormGroupInputDate, FormGroupInputNumber, FormGroupRadios, FormGroupStatic, FormGroupSearchBar, FormGroupSelect, FormGroupTextarea } from './form.models';
import { formGroupCheckboxesArgsMapper, formGroupCheckboxesArgTypes } from './form-groups/checkboxes/form-group-checkboxes.args';
import { formGroupConfirmArgsMapper, formGroupConfirmArgTypes } from './form-groups/confirm/form-group-confirm.args';
import { formGroupFilesArgsMapper, formGroupFilesArgTypes } from './form-groups/files/form-group-files.args';
import { formGroupInputArgsMapper, formGroupInputArgTypes } from './form-groups/input/form-group-input.args';
import { formGroupInputNumberArgsMapper, formGroupInputNumberArgTypes } from './form-groups/input-number/form-group-input-number.args';
import { formGroupRadiosArgsMapper, formGroupRadiosArgTypes } from './form-groups/radios/form-group-radios.args';
import { formGroupSelectArgsMapper, formGroupSelectArgTypes } from './form-groups/select/form-group-select.args';
import { formGroupStaticArgsMapper, formGroupStaticArgTypes } from './form-groups/static/form-group-static.args';
import { formGroupSearchBarArgsMapper, formGroupSearchBarArgTypes } from './form-groups/search-bar/form-group-search-bar.args';
import { formGroupTextareaArgsMapper, formGroupTextareaArgTypes } from './form-groups/textarea/form-group-textarea.args';


export interface FormParameters<TemplateFnReturnType> {
  formTemplate: (form: Form<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupDecorator: DecoratorFunction<TemplateFnReturnType>;
  formGroupCheckboxesTemplate: (formGroupCheckboxes: FormGroupCheckboxes<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupConfirmTemplate: (formGroupConfirm: FormGroupConfirm<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupFilesTemplate: (formGroupFiles: FormGroupFiles<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupInputTemplate: (formGroupInput: FormGroupInput<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupInputNumberTemplate: (formGroupInputNumber: FormGroupInputNumber<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupRadiosTemplate: (formGroupRadios: FormGroupRadios<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupSelectTemplate: (formGroupSelect: FormGroupSelect<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupStaticTemplate: (formGroupStatic: FormGroupStatic<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupSearchBarTemplate: (formGroupSearchBar: FormGroupSearchBar<TemplateFnReturnType>) => TemplateFnReturnType;
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
    formGroupFilesTemplate,
    formGroupInputTemplate,
    formGroupInputNumberTemplate,
    formGroupRadiosTemplate,
    formGroupSelectTemplate,
    formGroupStaticTemplate,
    formGroupSearchBarTemplate,
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

  storiesOf('Form/groups/files', mainModule)
    .addParameters({
      argTypes: formGroupFilesArgTypes,
      args: filesContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('files', bindTemplate(formGroupFilesArgsMapper, formGroupFilesTemplate)
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

  storiesOf('Form/groups/input-number', mainModule)
    .addParameters({
      argTypes: formGroupInputNumberArgTypes,
      args: inputNumberContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('input number', bindTemplate(formGroupInputNumberArgsMapper, formGroupInputNumberTemplate)
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

  storiesOf('Form/groups/select', mainModule)
    .addParameters({
      argTypes: formGroupSelectArgTypes,
      args: selectContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('select', bindTemplate(formGroupSelectArgsMapper, formGroupSelectTemplate)
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

  storiesOf('Form/groups/search-bar', mainModule)
    .addParameters({
      argTypes: formGroupSearchBarArgTypes,
      args: searchBarContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('search-bar', bindTemplate(formGroupSearchBarArgsMapper, formGroupSearchBarTemplate)
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
