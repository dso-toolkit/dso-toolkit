import { DecoratorFunction } from '@storybook/addons';

import { StorybookParameters } from '../../storybook';

import { FormArgs, formArgsMapper, formArgTypes } from './form.args';

import { checkboxesContent } from './content/checkboxes.content';
import { confirmContent } from './content/confirm.content';
import { filesContent } from './content/files.content';
import { inputContent } from './content/input.content';
import { inputNumberContent } from './content/input-number.content';
import { radiosContent } from './content/radios.content';
import { searchBarContent } from './content/search-bar.content';
import { selectContent } from './content/select.content';
import { staticContent } from './content/static.content';
import { textareaContent } from './content/textarea.content';
import { Form, FormGroupCheckboxes, FormGroupConfirm, FormGroupFiles, FormGroupInput, FormGroupInputDate, FormGroupInputNumber, FormGroupRadios, FormGroupSearchBar, FormGroupSelect, FormGroupStatic, FormGroupTextarea } from './form.models';
import { FormGroupCheckboxesArgs, formGroupCheckboxesArgsMapper, formGroupCheckboxesArgTypes } from './form-groups/checkboxes/form-group-checkboxes.args';
import { FormGroupConfirmArgs, formGroupConfirmArgsMapper, formGroupConfirmArgTypes } from './form-groups/confirm/form-group-confirm.args';
import { FormGroupFilesArgs, formGroupFilesArgsMapper, formGroupFilesArgTypes } from './form-groups/files/form-group-files.args';
import { FormGroupInputArgs, formGroupInputArgsMapper, formGroupInputArgTypes } from './form-groups/input/form-group-input.args';
import { FormGroupInputNumberArgs, formGroupInputNumberArgsMapper, formGroupInputNumberArgTypes } from './form-groups/input-number/form-group-input-number.args';
import { FormGroupRadiosArgs, formGroupRadiosArgsMapper, formGroupRadiosArgTypes } from './form-groups/radios/form-group-radios.args';
import { FormGroupSearchBarArgs, formGroupSearchBarArgsMapper, formGroupSearchBarArgTypes } from './form-groups/search-bar/form-group-search-bar.args';
import { FormGroupSelectArgs, formGroupSelectArgsMapper, formGroupSelectArgTypes } from './form-groups/select/form-group-select.args';
import { FormGroupStaticArgs, formGroupStaticArgsMapper, formGroupStaticArgTypes } from './form-groups/static/form-group-static.args';
import { FormGroupTextareaArgs, formGroupTextareaArgsMapper, formGroupTextareaArgTypes } from './form-groups/textarea/form-group-textarea.args';
import { StoryRoot } from '../../storybook';
import { TemplateContainer } from '../../template-container';

export interface FormTemplates<TemplateFnReturnType> {
  formTemplate: (form: Form<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupCheckboxesTemplate: (formGroupCheckboxes: FormGroupCheckboxes<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupConfirmTemplate: (formGroupConfirm: FormGroupConfirm<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupFilesTemplate: (formGroupFiles: FormGroupFiles<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupInputTemplate: (formGroupInput: FormGroupInput<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupInputNumberTemplate: (formGroupInputNumber: FormGroupInputNumber<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupRadiosTemplate: (formGroupRadios: FormGroupRadios<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupSearchBarTemplate: (formGroupSearchBar: FormGroupSearchBar<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupSelectTemplate: (formGroupSelect: FormGroupSelect<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupStaticTemplate: (formGroupStatic: FormGroupStatic<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupTextareaTemplate: (formGroupTextarea: FormGroupTextarea<TemplateFnReturnType>) => TemplateFnReturnType;
}

export interface FormParameters<TemplateFnReturnType> {
  formGroupDecorator: DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfForm<Implementation, Templates, TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  templateContainer: TemplateContainer<Implementation, Templates, TemplateFnReturnType>,
  storyTemplates: (templates: Templates) => FormTemplates<TemplateFnReturnType>,
  { formGroupDecorator }: FormParameters<TemplateFnReturnType>
) {
  storiesOf(`${StoryRoot.HtmlCss}/Form/form`, mainModule)
    .addParameters({
      argTypes: formArgTypes,
      docs: {
        page: readme
      }
    })
    .add('form', templateContainer.fromArgs<FormArgs>((args, templates) => {
      const { formTemplate } = storyTemplates(templates);

      return formTemplate(formArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/checkboxes`, mainModule)
    .addParameters({
      argTypes: formGroupCheckboxesArgTypes,
      args: checkboxesContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('checkboxes', templateContainer.fromArgs<FormGroupCheckboxesArgs>((args, templates) => {
      const { formGroupCheckboxesTemplate } = storyTemplates(templates);

      return formGroupCheckboxesTemplate(formGroupCheckboxesArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/confirm`, mainModule)
    .addParameters({
      argTypes: formGroupConfirmArgTypes,
      args: confirmContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('confirm', templateContainer.fromArgs<FormGroupConfirmArgs>((args, templates) => {
      const { formGroupConfirmTemplate } = storyTemplates(templates);

      return formGroupConfirmTemplate(formGroupConfirmArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/files`, mainModule)
    .addParameters({
      argTypes: formGroupFilesArgTypes,
      args: filesContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('files', templateContainer.fromArgs<FormGroupFilesArgs>((args, templates) => {
      const { formGroupFilesTemplate } = storyTemplates(templates);

      return formGroupFilesTemplate(formGroupFilesArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/input`, mainModule)
    .addParameters({
      argTypes: formGroupInputArgTypes,
      args: inputContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('input', templateContainer.fromArgs<FormGroupInputArgs>((args, templates) => {
      const { formGroupInputTemplate } = storyTemplates(templates);

      return formGroupInputTemplate(formGroupInputArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/input-number`, mainModule)
    .addParameters({
      argTypes: formGroupInputNumberArgTypes,
      args: inputNumberContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('input number', templateContainer.fromArgs<FormGroupInputNumberArgs>((args, templates) => {
      const { formGroupInputNumberTemplate } = storyTemplates(templates);

      return formGroupInputNumberTemplate(formGroupInputNumberArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/radios`, mainModule)
    .addParameters({
      argTypes: formGroupRadiosArgTypes,
      args: radiosContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('radios', templateContainer.fromArgs<FormGroupRadiosArgs>((args, templates) => {
      const { formGroupRadiosTemplate } = storyTemplates(templates);

      return formGroupRadiosTemplate(formGroupRadiosArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/search bar`, mainModule)
    .addParameters({
      argTypes: formGroupSearchBarArgTypes,
      args: searchBarContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('search bar', templateContainer.fromArgs<FormGroupSearchBarArgs>((args, templates) => {
      const { formGroupSearchBarTemplate } = storyTemplates(templates);

      return formGroupSearchBarTemplate(formGroupSearchBarArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/select`, mainModule)
    .addParameters({
      argTypes: formGroupSelectArgTypes,
      args: selectContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('select', templateContainer.fromArgs<FormGroupSelectArgs>((args, templates) => {
      const { formGroupSelectTemplate } = storyTemplates(templates);

      return formGroupSelectTemplate(formGroupSelectArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/static`, mainModule)
    .addParameters({
      argTypes: formGroupStaticArgTypes,
      args: staticContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('static', templateContainer.fromArgs<FormGroupStaticArgs>((args, templates) => {
      const { formGroupStaticTemplate } = storyTemplates(templates);

      return formGroupStaticTemplate(formGroupStaticArgsMapper(args));
    }));

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/textarea`, mainModule)
    .addParameters({
      argTypes: formGroupTextareaArgTypes,
      args: textareaContent,
      docs: {
        page: readme
      }
    })
    .addDecorator(formGroupDecorator)
    .add('textarea', templateContainer.fromArgs<FormGroupTextareaArgs>((args, templates) => {
      const { formGroupTextareaTemplate } = storyTemplates(templates);

      return formGroupTextareaTemplate(formGroupTextareaArgsMapper(args));
    }));
}
