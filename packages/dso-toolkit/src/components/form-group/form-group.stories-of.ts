import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";

import { FormGroupCheckboxes } from "./models/form-group-checkboxes.model.js";
import { FormGroupConfirm } from "./models/form-group-confirm.model.js";
import { FormGroupDatePicker } from "./models/form-group-date-picker.model.js";
import { FormGroupDatePickerLegacy } from "./models/form-group-date-picker-legacy.model.js";
import { FormGroupFiles } from "./models/form-group-files.model.js";
import { FormGroupInput, FormGroupInputDate } from "./models/form-group-input.model.js";
import { FormGroupRadios } from "./models/form-group-radios.model.js";
import { FormGroupSearchBar } from "./models/form-group-search-bar.model.js";
import { FormGroupSelect } from "./models/form-group-select.model.js";
import { FormGroupStatic } from "./models/form-group-static.model.js";
import { FormGroupTextarea } from "./models/form-group-textarea.model.js";
import {
  FormGroupCheckboxesArgs,
  formGroupCheckboxesArgsMapper,
  formGroupCheckboxesArgTypes,
} from "./args/form-group-checkboxes.args.js";
import { checkboxesContent } from "./content/checkboxes.content";
import {
  FormGroupConfirmArgs,
  formGroupConfirmArgsMapper,
  formGroupConfirmArgTypes,
} from "./args/form-group-confirm.args.js";
import { confirmContent } from "./content/confirm.content";
import {
  FormGroupDatePickerArgs,
  formGroupDatePickerArgsMapper,
  formGroupDatePickerArgTypes,
} from "./args/form-group-date-picker.args.js";
import { datePickerContent } from "./content/date-picker.content";

import {
  FormGroupDatePickerLegacyArgs,
  formGroupDatePickerLegacyArgsMapper,
  formGroupDatePickerLegacyArgTypes,
} from "./args/form-group-date-picker-legacy.args.js";
import { datePickerLegacyContent } from "./content/date-picker-legacy.content";
import { FormGroupFilesArgs, formGroupFilesArgsMapper, formGroupFilesArgTypes } from "./args/form-group-files.args.js";
import { files, filesContent } from "./content/files.content";
import { FormGroupInputArgs, formGroupInputArgsMapper, formGroupInputArgTypes } from "./args/form-group-input.args.js";
import { inputContent } from "./content/input.content";
import {
  FormGroupRadiosArgs,
  formGroupRadiosArgsMapper,
  formGroupRadiosArgTypes,
} from "./args/form-group-radios.args.js";
import { radiosContent } from "./content/radios.content";
import {
  FormGroupSearchBarArgs,
  formGroupSearchBarArgsMapper,
  formGroupSearchBarArgTypes,
} from "./args/form-group-search-bar.args.js";
import { searchBarContent } from "./content/search-bar.content";
import {
  FormGroupSelectArgs,
  formGroupSelectArgsMapper,
  formGroupSelectArgTypes,
} from "./args/form-group-select.args.js";
import { selectContent } from "./content/select.content";
import {
  FormGroupStaticArgs,
  formGroupStaticArgsMapper,
  formGroupStaticArgTypes,
} from "./args/form-group-static.args.js";
import { staticContent } from "./content/static.content";
import {
  FormGroupTextareaArgs,
  formGroupTextareaArgsMapper,
  formGroupTextareaArgTypes,
} from "./args/form-group-textarea.args.js";
import { textareaContent } from "./content/textarea.content";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

export type FormGroupDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

interface FormGroupStories {
  Checkboxes: StoryObj<FormGroupCheckboxesArgs, Renderer>;
  Confirm: StoryObj<FormGroupConfirmArgs, Renderer>;
  DatePicker: StoryObj<FormGroupDatePickerArgs, Renderer>;
  DatePickerLegacy: StoryObj<FormGroupDatePickerLegacyArgs, Renderer>;
  Files: StoryObj<FormGroupFilesArgs, Renderer>;
  NoFiles: StoryObj<FormGroupFilesArgs, Renderer>;
  Input: StoryObj<FormGroupInputArgs, Renderer>;
  Radios: StoryObj<FormGroupRadiosArgs, Renderer>;
  SearchBar: StoryObj<FormGroupSearchBarArgs, Renderer>;
  Select: StoryObj<FormGroupSelectArgs, Renderer>;
  Static: StoryObj<FormGroupStaticArgs, Renderer>;
  Textarea: StoryObj<FormGroupTextareaArgs, Renderer>;
}

export interface FormGroupTemplates<TemplateFnReturnType> {
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
  formGroupRadiosTemplate: (formGroupRadios: FormGroupRadios<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupSearchBarTemplate: (formGroupSearchBar: FormGroupSearchBar<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupSelectTemplate: (formGroupSelect: FormGroupSelect<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupStaticTemplate: (formGroupStatic: FormGroupStatic<TemplateFnReturnType>) => TemplateFnReturnType;
  formGroupTextareaTemplate: (formGroupTextarea: FormGroupTextarea<TemplateFnReturnType>) => TemplateFnReturnType;
}

export interface FormGroupStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, FormGroupTemplates<TemplateFnReturnType>> {
  decorator: FormGroupDecorator<TemplateFnReturnType>;
}

export type FormGroupArgs =
  | FormGroupCheckboxesArgs
  | FormGroupConfirmArgs
  | FormGroupDatePickerArgs
  | FormGroupDatePickerLegacyArgs
  | FormGroupFilesArgs
  | FormGroupInputArgs
  | FormGroupRadiosArgs
  | FormGroupSearchBarArgs
  | FormGroupSelectArgs
  | FormGroupStaticArgs
  | FormGroupTextareaArgs;

export function formGroupMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  FormGroupArgs
> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}
export function formGroupStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  decorator,
}: FormGroupStoriesParameters<Implementation, Templates, TemplateFnReturnType>): FormGroupStories {
  return {
    Checkboxes: {
      args: checkboxesContent,
      argTypes: formGroupCheckboxesArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupCheckboxesTemplate }) =>
        formGroupCheckboxesTemplate(formGroupCheckboxesArgsMapper(args)),
      ),
    },
    Confirm: {
      args: confirmContent,
      argTypes: formGroupConfirmArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupConfirmTemplate }) =>
        formGroupConfirmTemplate(formGroupConfirmArgsMapper(args)),
      ),
    },
    DatePicker: {
      args: datePickerContent,
      argTypes: formGroupDatePickerArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupDatePickerTemplate }) =>
        formGroupDatePickerTemplate(formGroupDatePickerArgsMapper(args)),
      ),
    },
    DatePickerLegacy: {
      args: datePickerLegacyContent,
      argTypes: formGroupDatePickerLegacyArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupDatePickerLegacyTemplate }) =>
        formGroupDatePickerLegacyTemplate(formGroupDatePickerLegacyArgsMapper(args)),
      ),
    },
    Files: {
      args: filesContent,
      argTypes: formGroupFilesArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupFilesTemplate }) =>
        formGroupFilesTemplate(formGroupFilesArgsMapper(args, files)),
      ),
    },
    NoFiles: {
      args: filesContent,
      argTypes: formGroupFilesArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupFilesTemplate }) =>
        formGroupFilesTemplate(formGroupFilesArgsMapper(args, [])),
      ),
    },
    Input: {
      args: inputContent,
      argTypes: formGroupInputArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupInputTemplate }) =>
        formGroupInputTemplate(formGroupInputArgsMapper(args)),
      ),
    },
    Radios: {
      args: radiosContent,
      argTypes: formGroupRadiosArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupRadiosTemplate }) =>
        formGroupRadiosTemplate(formGroupRadiosArgsMapper(args)),
      ),
    },
    SearchBar: {
      args: searchBarContent,
      argTypes: formGroupSearchBarArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupSearchBarTemplate }) =>
        formGroupSearchBarTemplate(formGroupSearchBarArgsMapper(args)),
      ),
    },
    Select: {
      args: selectContent,
      argTypes: formGroupSelectArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupSelectTemplate }) =>
        formGroupSelectTemplate(formGroupSelectArgsMapper(args)),
      ),
    },
    Static: {
      args: staticContent,
      argTypes: formGroupStaticArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupStaticTemplate }) =>
        formGroupStaticTemplate(formGroupStaticArgsMapper(args)),
      ),
    },
    Textarea: {
      args: textareaContent,
      argTypes: formGroupTextareaArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupTextareaTemplate }) =>
        formGroupTextareaTemplate(formGroupTextareaArgsMapper(args)),
      ),
    },
  };
}
