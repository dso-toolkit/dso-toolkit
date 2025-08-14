import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, PartialStoryFn, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import {
  FormGroupCheckboxesArgs,
  formGroupCheckboxesArgTypes,
  formGroupCheckboxesArgs,
  formGroupCheckboxesArgsMapper,
} from "./checkboxes/form-group-checkboxes.args";
import { FormGroupCheckboxes } from "./checkboxes/form-group-checkboxes.models";
import {
  FormGroupConfirmArgs,
  formGroupConfirmArgTypes,
  formGroupConfirmArgsMapper,
  formGroupConfirmContent,
} from "./confirm/form-group-confirm.args";
import { FormGroupConfirm } from "./confirm/form-group-confirm.models";
import {
  FormGroupDatePickerArgs,
  formGroupDatePickerArgTypes,
  formGroupDatePickerArgs,
  formGroupDatePickerArgsMapper,
} from "./date-picker/form-group-date-picker.args";
import { FormGroupDatePicker } from "./date-picker/form-group-date-picker.models";
import {
  FormGroupDatePickerLegacyArgs,
  formGroupDatePickerLegacyArgTypes,
  formGroupDatePickerLegacyArgsMapper,
} from "./date-picker-legacy/form-group-date-picker-legacy.args";
import { datePickerLegacyContent } from "./date-picker-legacy/form-group-date-picker-legacy.content";
import { FormGroupDatePickerLegacy } from "./date-picker-legacy/form-group-date-picker-legacy.models";
import {
  FormGroupFilesArgs,
  formGroupFilesArgTypes,
  formGroupFilesArgs,
  formGroupFilesArgsMapper,
} from "./files/form-group-files.args";
import { files } from "./files/form-group-files.content";
import { FormGroupFiles } from "./files/form-group-files.models";
import {
  FormGroupInputArgs,
  formGroupInputArgTypes,
  formGroupInputArgs,
  formGroupInputArgsMapper,
} from "./input/form-group-input.args";
import { FormGroupInput, FormGroupInputDate } from "./input/form-group-input.models";
import {
  FormGroupRadiosArgs,
  formGroupRadiosArgTypes,
  formGroupRadiosArgs,
  formGroupRadiosArgsMapper,
} from "./radios/form-group-radios.args";
import { FormGroupRadios } from "./radios/form-group-radios.models";
import {
  FormGroupSearchBarArgs,
  formGroupSearchBarArgTypes,
  formGroupSearchBarArgs,
  formGroupSearchBarArgsMapper,
} from "./search-bar/form-group-search-bar.args";
import { FormGroupSearchBar } from "./search-bar/form-group-search-bar.models";
import {
  FormGroupSelectArgs,
  formGroupSelectArgTypes,
  formGroupSelectArgs,
  formGroupSelectArgsMapper,
} from "./select/form-group-select.args";
import { FormGroupSelect } from "./select/form-group-select.models";
import {
  FormGroupStaticArgs,
  formGroupStaticArgTypes,
  formGroupStaticArgs,
  formGroupStaticArgsMapper,
} from "./static/form-group-static.args";
import { FormGroupStatic } from "./static/form-group-static.models";
import {
  FormGroupTextareaArgs,
  formGroupTextareaArgTypes,
  formGroupTextareaArgs,
  formGroupTextareaArgsMapper,
} from "./textarea/form-group-textarea.args";
import { FormGroupTextarea } from "./textarea/form-group-textarea.models";

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
      args: formGroupCheckboxesArgs,
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
      args: formGroupDatePickerArgs,
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
      args: formGroupFilesArgs,
      argTypes: formGroupFilesArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupFilesTemplate }) =>
        formGroupFilesTemplate(formGroupFilesArgsMapper(args, files)),
      ),
      storyName: "Files (files uploaded)",
    },
    NoFiles: {
      args: formGroupFilesArgs,
      argTypes: formGroupFilesArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupFilesTemplate }) =>
        formGroupFilesTemplate(formGroupFilesArgsMapper(args, [])),
      ),
      storyName: "Files (no files uploaded)",
    },
    Input: {
      args: formGroupInputArgs,
      argTypes: formGroupInputArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupInputTemplate }) =>
        formGroupInputTemplate(formGroupInputArgsMapper(args)),
      ),
    },
    Radios: {
      args: formGroupRadiosArgs,
      argTypes: formGroupRadiosArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupRadiosTemplate }) =>
        formGroupRadiosTemplate(formGroupRadiosArgsMapper(args)),
      ),
    },
    SearchBar: {
      args: formGroupSearchBarArgs,
      argTypes: formGroupSearchBarArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupSearchBarTemplate }) =>
        formGroupSearchBarTemplate(formGroupSearchBarArgsMapper(args)),
      ),
    },
    Select: {
      args: formGroupSelectArgs,
      argTypes: formGroupSelectArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupSelectTemplate }) =>
        formGroupSelectTemplate(formGroupSelectArgsMapper(args)),
      ),
    },
    Static: {
      args: formGroupStaticArgs,
      argTypes: formGroupStaticArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupStaticTemplate }) =>
        formGroupStaticTemplate(formGroupStaticArgsMapper(args)),
      ),
    },
    Textarea: {
      args: formGroupTextareaArgs,
      argTypes: formGroupTextareaArgTypes,
      decorators: [(story) => decorator(story)],
      render: templateContainer.render(storyTemplates, (args, { formGroupTextareaTemplate }) =>
        formGroupTextareaTemplate(formGroupTextareaArgsMapper(args)),
      ),
    },
  };
}
