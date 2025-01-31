import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";

import { FormGroupCheckboxes } from "./checkboxes/form-group-checkboxes.models";
import { FormGroupConfirm } from "./confirm/form-group-confirm.models";
import { FormGroupDatePicker } from "./date-picker/form-group-date-picker.models";
import { FormGroupDatePickerLegacy } from "./date-picker-legacy/form-group-date-picker-legacy.models";
import { FormGroupFiles } from "./files/form-group-files.models";
import { FormGroupInput, FormGroupInputDate } from "./input/form-group-input.models";
import { FormGroupRadios } from "./radios/form-group-radios.models";
import { FormGroupSearchBar } from "./search-bar/form-group-search-bar.models";
import { FormGroupSelect } from "./select/form-group-select.models";
import { FormGroupStatic } from "./static/form-group-static.models";
import { FormGroupTextarea } from "./textarea/form-group-textarea.models";
import {
  FormGroupCheckboxesArgs,
  formGroupCheckboxesArgsMapper,
  formGroupCheckboxesArgTypes,
} from "./checkboxes/form-group-checkboxes.args";
import { checkboxesContent } from "./checkboxes/form-group-checkboxes.content";
import {
  FormGroupConfirmArgs,
  formGroupConfirmArgsMapper,
  formGroupConfirmArgTypes,
} from "./confirm/form-group-confirm.args";
import { formGroupConfirmContent } from "./confirm/form-group-confirm.content";
import {
  FormGroupDatePickerArgs,
  formGroupDatePickerArgsMapper,
  formGroupDatePickerArgTypes,
} from "./date-picker/form-group-date-picker.args";
import { datePickerContent } from "./date-picker/form-group-date-picker.content";

import {
  FormGroupDatePickerLegacyArgs,
  formGroupDatePickerLegacyArgsMapper,
  formGroupDatePickerLegacyArgTypes,
} from "./date-picker-legacy/form-group-date-picker-legacy.args";
import { datePickerLegacyContent } from "./date-picker-legacy/form-group-date-picker-legacy.content";
import { FormGroupFilesArgs, formGroupFilesArgsMapper, formGroupFilesArgTypes } from "./files/form-group-files.args";
import { files, filesContent } from "./files/form-group-files.content";
import { FormGroupInputArgs, formGroupInputArgsMapper, formGroupInputArgTypes } from "./input/form-group-input.args";
import { inputContent } from "./input/form-group-input.content";
import {
  FormGroupRadiosArgs,
  formGroupRadiosArgsMapper,
  formGroupRadiosArgTypes,
} from "./radios/form-group-radios.args";
import { radiosContent } from "./radios/form-group-radios.content";
import {
  FormGroupSearchBarArgs,
  formGroupSearchBarArgsMapper,
  formGroupSearchBarArgTypes,
} from "./search-bar/form-group-search-bar.args";
import { searchBarContent } from "./search-bar/form-group-search-bar.content";
import {
  FormGroupSelectArgs,
  formGroupSelectArgsMapper,
  formGroupSelectArgTypes,
} from "./select/form-group-select.args";
import { selectContent } from "./select/form-group-select.content";
import {
  FormGroupStaticArgs,
  formGroupStaticArgsMapper,
  formGroupStaticArgTypes,
} from "./static/form-group-static.args";
import { staticContent } from "./static/form-group-static.content";
import {
  FormGroupTextareaArgs,
  formGroupTextareaArgsMapper,
  formGroupTextareaArgTypes,
} from "./textarea/form-group-textarea.args";
import { textareaContent } from "./textarea/form-group-textarea.content";

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
      args: formGroupConfirmContent,
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
      storyName: "Files (files uploaded)",
    },
    NoFiles: {
      args: filesContent,
      argTypes: formGroupFilesArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupFilesTemplate }) =>
        formGroupFilesTemplate(formGroupFilesArgsMapper(args, [])),
      ),
      storyName: "Files (no files uploaded)",
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
