import { compiler } from "markdown-to-jsx";
import { Addon_DecoratorFunction } from "@storybook/types";

import { StorybookParameters, StoryRoot } from "../../storybook/index.js";

import { FormArgs, formArgsMapper, formArgTypes } from "./form.args.js";

import { checkboxesContent } from "./content/checkboxes.content.js";
import { confirmContent } from "./content/confirm.content.js";
import { filesContent } from "./content/files.content.js";
import { inputContent } from "./content/input.content.js";
import { inputNumberContent } from "./content/input-number.content.js";
import { radiosContent } from "./content/radios.content.js";
import { searchBarContent } from "./content/search-bar.content.js";
import { selectContent } from "./content/select.content.js";
import { staticContent } from "./content/static.content.js";
import { textareaContent } from "./content/textarea.content.js";

import {
  FormGroupCheckboxesArgs,
  formGroupCheckboxesArgsMapper,
  formGroupCheckboxesArgTypes,
} from "./args/form-group-checkboxes.args.js";
import {
  FormGroupConfirmArgs,
  formGroupConfirmArgsMapper,
  formGroupConfirmArgTypes,
} from "./args/form-group-confirm.args.js";
import {
  FormGroupDatePickerArgs,
  formGroupDatePickerArgsMapper,
  formGroupDatePickerArgTypes,
} from "./args/form-group-date-picker.args.js";
import {
  FormGroupDatePickerLegacyArgs,
  formGroupDatePickerLegacyArgsMapper,
  formGroupDatePickerLegacyArgTypes,
} from "./args/form-group-date-picker-legacy.args.js";
import { FormGroupFilesArgs, formGroupFilesArgsMapper, formGroupFilesArgTypes } from "./args/form-group-files.args.js";
import { FormGroupInputArgs, formGroupInputArgsMapper, formGroupInputArgTypes } from "./args/form-group-input.args.js";
import {
  FormGroupInputNumberArgs,
  formGroupInputNumberArgsMapper,
  formGroupInputNumberArgTypes,
} from "./args/form-group-input-number.args.js";
import {
  FormGroupRadiosArgs,
  formGroupRadiosArgsMapper,
  formGroupRadiosArgTypes,
} from "./args/form-group-radios.args.js";
import {
  FormGroupSearchBarArgs,
  formGroupSearchBarArgsMapper,
  formGroupSearchBarArgTypes,
} from "./args/form-group-search-bar.args.js";
import {
  FormGroupSelectArgs,
  formGroupSelectArgsMapper,
  formGroupSelectArgTypes,
} from "./args/form-group-select.args.js";
import {
  FormGroupStaticArgs,
  formGroupStaticArgsMapper,
  formGroupStaticArgTypes,
} from "./args/form-group-static.args.js";
import {
  FormGroupTextareaArgs,
  formGroupTextareaArgsMapper,
  formGroupTextareaArgTypes,
} from "./args/form-group-textarea.args.js";

import { TemplateContainer } from "../../template-container.js";
import { FormGroupCheckboxes } from "./models/form-group-checkboxes.model.js";
import { FormGroupConfirm } from "./models/form-group-confirm.model.js";
import { FormGroupDatePicker } from "./models/form-group-date-picker.model.js";
import { FormGroupDatePickerLegacy } from "./models/form-group-date-picker-legacy.model.js";
import { FormGroupFiles } from "./models/form-group-files.model.js";
import { FormGroupInputNumber } from "./models/form-group-input-number.model.js";
import { FormGroupInput, FormGroupInputDate } from "./models/form-group-input.model.js";
import { FormGroupRadios } from "./models/form-group-radios.model.js";
import { FormGroupSearchBar } from "./models/form-group-search-bar.model.js";
import { FormGroupSelect } from "./models/form-group-select.model.js";
import { FormGroupStatic } from "./models/form-group-static.model.js";
import { FormGroupTextarea } from "./models/form-group-textarea.model.js";
import { Form } from "./models/form.model.js";
import { datePickerContent } from "./content/date-picker.content.js";
import { DatePickerLegacyContent } from "./content/date-picker-legacy.content.js";

export interface FormTemplates<TemplateFnReturnType> {
  formTemplate: (form: Form<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupCheckboxesTemplate: (formGroupCheckboxes: FormGroupCheckboxes<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupConfirmTemplate: (formGroupConfirm: FormGroupConfirm<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupDatePickerTemplate: (formGroupDatePicker: FormGroupDatePicker<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupDatePickerLegacyTemplate: (
    formGroupDatePickerLegacy: FormGroupDatePickerLegacy<TemplateFnReturnType>,
  ) => TemplateFnReturnType;
  formGroupFilesTemplate: (formGroupFiles: FormGroupFiles<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupInputTemplate: (
    formGroupInput: FormGroupInput<TemplateFnReturnType> | FormGroupInputDate<TemplateFnReturnType>,
  ) => TemplateFnReturnType;
  formGroupInputNumberTemplate: (
    formGroupInputNumber: FormGroupInputNumber<TemplateFnReturnType>,
  ) => TemplateFnReturnType;
  formGroupRadiosTemplate: (formGroupRadios: FormGroupRadios<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupSearchBarTemplate: (formGroupSearchBar: FormGroupSearchBar<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupSelectTemplate: (formGroupSelect: FormGroupSelect<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupStaticTemplate: (formGroupStatic: FormGroupStatic<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupTextareaTemplate: (formGroupTextarea: FormGroupTextarea<TemplateFnReturnType>) => TemplateFnReturnType;
}

export interface FormParameters<TemplateFnReturnType> {
  formGroupDecorator: Addon_DecoratorFunction<TemplateFnReturnType>;
}

export function storiesOfForm<Implementation, Templates, TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  templateContainer: TemplateContainer<Implementation, Templates, TemplateFnReturnType>,
  storyTemplates: (templates: Templates) => FormTemplates<TemplateFnReturnType>,
  { formGroupDecorator }: FormParameters<TemplateFnReturnType>,
) {
  storiesOf(`${StoryRoot.HtmlCss}/Form/vertical`, mainModule)
    .addParameters({
      argTypes: formArgTypes,
      args: {
        legend: "Formulier Verticaal",
        mode: "vertical",
      },
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .add(
      "form",
      templateContainer.fromArgs<FormArgs>((args, templates) => {
        const { formTemplate } = storyTemplates(templates);

        return formTemplate(formArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/horizontal`, mainModule)
    .addParameters({
      argTypes: formArgTypes,
      args: {
        legend: "Formulier Horizontaal",
        mode: "horizontal",
      },
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .add(
      "form",
      templateContainer.fromArgs<FormArgs>((args, templates) => {
        const { formTemplate } = storyTemplates(templates);

        return formTemplate(formArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/checkboxes`, mainModule)
    .addParameters({
      argTypes: formGroupCheckboxesArgTypes,
      args: checkboxesContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "checkboxes",
      templateContainer.fromArgs<FormGroupCheckboxesArgs>((args, templates) => {
        const { formGroupCheckboxesTemplate } = storyTemplates(templates);

        return formGroupCheckboxesTemplate(formGroupCheckboxesArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/confirm`, mainModule)
    .addParameters({
      argTypes: formGroupConfirmArgTypes,
      args: confirmContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "confirm",
      templateContainer.fromArgs<FormGroupConfirmArgs>((args, templates) => {
        const { formGroupConfirmTemplate } = storyTemplates(templates);

        return formGroupConfirmTemplate(formGroupConfirmArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/date-picker`, mainModule)
    .addParameters({
      argTypes: formGroupDatePickerArgTypes,
      args: datePickerContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "date picker",
      templateContainer.fromArgs<FormGroupDatePickerArgs>((args, templates) => {
        const { formGroupDatePickerTemplate } = storyTemplates(templates);

        return formGroupDatePickerTemplate(formGroupDatePickerArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/date-picker-legacy`, mainModule)
    .addParameters({
      argTypes: formGroupDatePickerLegacyArgTypes,
      args: DatePickerLegacyContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "date picker",
      templateContainer.fromArgs<FormGroupDatePickerLegacyArgs>((args, templates) => {
        const { formGroupDatePickerLegacyTemplate } = storyTemplates(templates);

        return formGroupDatePickerLegacyTemplate(formGroupDatePickerLegacyArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/files`, mainModule)
    .addParameters({
      argTypes: formGroupFilesArgTypes,
      args: filesContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "files",
      templateContainer.fromArgs<FormGroupFilesArgs>((args, templates) => {
        const { formGroupFilesTemplate } = storyTemplates(templates);

        return formGroupFilesTemplate(formGroupFilesArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/input`, mainModule)
    .addParameters({
      argTypes: formGroupInputArgTypes,
      args: inputContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "input",
      templateContainer.fromArgs<FormGroupInputArgs>((args, templates) => {
        const { formGroupInputTemplate } = storyTemplates(templates);

        return formGroupInputTemplate(formGroupInputArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/input-number`, mainModule)
    .addParameters({
      argTypes: formGroupInputNumberArgTypes,
      args: inputNumberContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "input number",
      templateContainer.fromArgs<FormGroupInputNumberArgs>((args, templates) => {
        const { formGroupInputNumberTemplate } = storyTemplates(templates);

        return formGroupInputNumberTemplate(formGroupInputNumberArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/radios`, mainModule)
    .addParameters({
      argTypes: formGroupRadiosArgTypes,
      args: radiosContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "radios",
      templateContainer.fromArgs<FormGroupRadiosArgs>((args, templates) => {
        const { formGroupRadiosTemplate } = storyTemplates(templates);

        return formGroupRadiosTemplate(formGroupRadiosArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/search bar`, mainModule)
    .addParameters({
      argTypes: formGroupSearchBarArgTypes,
      args: searchBarContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "search bar",
      templateContainer.fromArgs<FormGroupSearchBarArgs>((args, templates) => {
        const { formGroupSearchBarTemplate } = storyTemplates(templates);

        return formGroupSearchBarTemplate(formGroupSearchBarArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/select`, mainModule)
    .addParameters({
      argTypes: formGroupSelectArgTypes,
      args: selectContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "select",
      templateContainer.fromArgs<FormGroupSelectArgs>((args, templates) => {
        const { formGroupSelectTemplate } = storyTemplates(templates);

        return formGroupSelectTemplate(formGroupSelectArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/static`, mainModule)
    .addParameters({
      argTypes: formGroupStaticArgTypes,
      args: staticContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "static",
      templateContainer.fromArgs<FormGroupStaticArgs>((args, templates) => {
        const { formGroupStaticTemplate } = storyTemplates(templates);

        return formGroupStaticTemplate(formGroupStaticArgsMapper(args));
      }),
    );

  storiesOf(`${StoryRoot.HtmlCss}/Form/groups/textarea`, mainModule)
    .addParameters({
      argTypes: formGroupTextareaArgTypes,
      args: textareaContent,
      docs: {
        page: () => compiler(readme, { forceBlock: true }),
      },
    })
    .addDecorator(formGroupDecorator)
    .add(
      "textarea",
      templateContainer.fromArgs<FormGroupTextareaArgs>((args, templates) => {
        const { formGroupTextareaTemplate } = storyTemplates(templates);

        return formGroupTextareaTemplate(formGroupTextareaArgsMapper(args));
      }),
    );
}
