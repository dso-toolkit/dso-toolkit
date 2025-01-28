import { Meta } from "@storybook/web-components";

import { FormGroupArgs, formGroupMeta, formGroupStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/form-group/readme.md?raw";

import { templateContainer } from "../../templates";
import { html } from "lit-html";

const meta: Meta<FormGroupArgs> = {
  ...formGroupMeta({ readme }),
  title: "HTML|CSS/Form Group",
};

export default meta;

const {
  Checkboxes,
  Confirm,
  DatePicker,
  DatePickerLegacy,
  Files,
  NoFiles,
  Input,
  Radios,
  SearchBar,
  Select,
  Static,
  Textarea,
} = formGroupStories({
  templateContainer,
  storyTemplates: (templates) => {
    const {
      formGroupCheckboxesTemplate,
      formGroupConfirmTemplate,
      formGroupDatePickerTemplate,
      formGroupDatePickerLegacyTemplate,
      formGroupFilesTemplate,
      formGroupInputTemplate,
      formGroupRadiosTemplate,
      formGroupSearchBarTemplate,
      formGroupSelectTemplate,
      formGroupStaticTemplate,
      formGroupTextareaTemplate,
    } = templates;

    return {
      formGroupCheckboxesTemplate,
      formGroupConfirmTemplate,
      formGroupDatePickerTemplate,
      formGroupDatePickerLegacyTemplate,
      formGroupFilesTemplate,
      formGroupInputTemplate,
      formGroupRadiosTemplate,
      formGroupSearchBarTemplate,
      formGroupSelectTemplate,
      formGroupStaticTemplate,
      formGroupTextareaTemplate,
    };
  },
  decorator: (story) => html`<formGroup>${story()}</formGroup>`,
});

export {
  Checkboxes,
  Confirm,
  DatePicker,
  DatePickerLegacy,
  Files,
  NoFiles,
  Input,
  Radios,
  SearchBar,
  Select,
  Static,
  Textarea,
};
