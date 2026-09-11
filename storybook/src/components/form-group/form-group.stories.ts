import type { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/form-group/readme.md?raw";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";

import {
  FormGroupCheckboxesArgs,
  formGroupCheckboxesArgTypes,
  formGroupCheckboxesArgs,
  formGroupCheckboxesArgsMapper,
} from "./form-group-checkboxes.args.js";
import { formGroupCheckboxesTemplate } from "./form-group-checkboxes.template.js";
import {
  FormGroupConfirmArgs,
  formGroupConfirmArgTypes,
  formGroupConfirmArgsMapper,
  formGroupConfirmContent,
} from "./form-group-confirm.args.js";
import { formGroupConfirmTemplate } from "./form-group-confirm.template.js";
import {
  FormGroupDatePickerArgs,
  formGroupDatePickerArgTypes,
  formGroupDatePickerArgs,
  formGroupDatePickerArgsMapper,
} from "./form-group-date-picker.args.js";
import { formGroupDatePickerTemplate } from "./form-group-date-picker.template.js";
import {
  FormGroupFilesArgs,
  formGroupFilesArgTypes,
  formGroupFilesArgs,
  formGroupFilesArgsMapper,
} from "./form-group-files.args.js";
import { files } from "./form-group-files.content.js";
import { formGroupFilesTemplate } from "./form-group-files.template.js";
import {
  FormGroupInputArgs,
  formGroupInputArgTypes,
  formGroupInputArgs,
  formGroupInputArgsMapper,
} from "./form-group-input.args.js";
import { formGroupInputTemplate } from "./form-group-input.template.js";
import {
  FormGroupRadiosArgs,
  formGroupRadiosArgTypes,
  formGroupRadiosArgs,
  formGroupRadiosArgsMapper,
} from "./form-group-radios.args.js";
import { formGroupRadiosTemplate } from "./form-group-radios.template.js";
import {
  FormGroupSearchBarArgs,
  formGroupSearchBarArgTypes,
  formGroupSearchBarArgs,
  formGroupSearchBarArgsMapper,
} from "./form-group-search-bar.args.js";
import { formGroupSearchBarTemplate } from "./form-group-search-bar.template.js";
import {
  FormGroupSelectArgs,
  formGroupSelectArgTypes,
  formGroupSelectArgs,
  formGroupSelectArgsMapper,
} from "./form-group-select.args.js";
import { formGroupSelectTemplate } from "./form-group-select.template.js";
import {
  FormGroupStaticArgs,
  formGroupStaticArgTypes,
  formGroupStaticArgs,
  formGroupStaticArgsMapper,
} from "./form-group-static.args.js";
import { formGroupStaticTemplate } from "./form-group-static.template.js";
import {
  FormGroupTextareaArgs,
  formGroupTextareaArgTypes,
  formGroupTextareaArgs,
  formGroupTextareaArgsMapper,
} from "./form-group-textarea.args.js";
import { formGroupTextareaTemplate } from "./form-group-textarea.template.js";

type FormGroupCheckboxesStory = StoryObj<FormGroupCheckboxesArgs>;
type FormGroupConfirmStory = StoryObj<FormGroupConfirmArgs>;
type FormGroupDatePickerStory = StoryObj<FormGroupDatePickerArgs>;
type FormGroupFilesStory = StoryObj<FormGroupFilesArgs>;
type FormGroupInputStory = StoryObj<FormGroupInputArgs>;
type FormGroupRadiosStory = StoryObj<FormGroupRadiosArgs>;
type FormGroupSearchBarStory = StoryObj<FormGroupSearchBarArgs>;
type FormGroupSelectStory = StoryObj<FormGroupSelectArgs>;
type FormGroupStaticStory = StoryObj<FormGroupStaticArgs>;
type FormGroupTextareaStory = StoryObj<FormGroupTextareaArgs>;

const meta: Meta = {
  title: "HTML|CSS/Form Group",
  decorators: [(story) => html`<formGroup>${story()}</formGroup>`],
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Checkboxes: FormGroupCheckboxesStory = {
  args: formGroupCheckboxesArgs,
  argTypes: formGroupCheckboxesArgTypes,
  render: (args) => formGroupCheckboxesTemplate(formGroupCheckboxesArgsMapper(args)),
};

export const Confirm: FormGroupConfirmStory = {
  args: formGroupConfirmContent,
  argTypes: formGroupConfirmArgTypes,
  render: (args) => formGroupConfirmTemplate(formGroupConfirmArgsMapper(args)),
};

export const DatePicker: FormGroupDatePickerStory = {
  args: formGroupDatePickerArgs,
  argTypes: formGroupDatePickerArgTypes,
  render: (args) => formGroupDatePickerTemplate(formGroupDatePickerArgsMapper(args)),
};

export const Files: FormGroupFilesStory = {
  args: formGroupFilesArgs,
  argTypes: formGroupFilesArgTypes,
  render: (args) => formGroupFilesTemplate(formGroupFilesArgsMapper(args, files)),
  name: "Files (files uploaded)",
};

export const NoFiles: FormGroupFilesStory = {
  args: formGroupFilesArgs,
  argTypes: formGroupFilesArgTypes,
  render: (args) => formGroupFilesTemplate(formGroupFilesArgsMapper(args, [])),
  name: "Files (no files uploaded)",
};

export const Input: FormGroupInputStory = {
  args: formGroupInputArgs,
  argTypes: formGroupInputArgTypes,
  render: (args) => formGroupInputTemplate(formGroupInputArgsMapper(args)),
};

export const Radios: FormGroupRadiosStory = {
  args: formGroupRadiosArgs,
  argTypes: formGroupRadiosArgTypes,
  render: (args) => formGroupRadiosTemplate(formGroupRadiosArgsMapper(args)),
};

export const SearchBar: FormGroupSearchBarStory = {
  args: formGroupSearchBarArgs,
  argTypes: formGroupSearchBarArgTypes,
  render: (args) => formGroupSearchBarTemplate(formGroupSearchBarArgsMapper(args)),
};

export const Select: FormGroupSelectStory = {
  args: formGroupSelectArgs,
  argTypes: formGroupSelectArgTypes,
  render: (args) => formGroupSelectTemplate(formGroupSelectArgsMapper(args)),
};

export const Static: FormGroupStaticStory = {
  args: formGroupStaticArgs,
  argTypes: formGroupStaticArgTypes,
  render: (args) => formGroupStaticTemplate(formGroupStaticArgsMapper(args)),
};

export const Textarea: FormGroupTextareaStory = {
  args: formGroupTextareaArgs,
  argTypes: formGroupTextareaArgTypes,
  render: (args) => formGroupTextareaTemplate(formGroupTextareaArgsMapper(args)),
};
