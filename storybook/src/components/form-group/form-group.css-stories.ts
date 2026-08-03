import { Meta } from "@storybook/web-components-vite";
import { FormGroupArgs, formGroupMeta, formGroupStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/form-group/readme.md?raw";
import { html } from "lit-html";

import { formGroupCheckboxesTemplate } from "./form-group-checkboxes.css-template";
import { formGroupConfirmTemplate } from "./form-group-confirm.css-template";
import { formGroupDatePickerTemplate } from "./form-group-date-picker.css-template";
import { formGroupFilesTemplate } from "./form-group-files.css-template";
import { formGroupInputTemplate } from "./form-group-input.css-template";
import { formGroupRadiosTemplate } from "./form-group-radios.css-template";
import { formGroupSearchBarTemplate } from "./form-group-search-bar.css-template";
import { formGroupSelectTemplate } from "./form-group-select.css-template";
import { formGroupStaticTemplate } from "./form-group-static.css-template";
import { formGroupTextareaTemplate } from "./form-group-textarea.css-template";

const meta: Meta<FormGroupArgs> = {
  ...formGroupMeta({ readme }),
  title: "HTML|CSS/Form Group",
};

export default meta;

const { Checkboxes, Confirm, DatePicker, Files, NoFiles, Input, Radios, SearchBar, Select, Static, Textarea } =
  formGroupStories({
    storyTemplates: () => {
      return {
        formGroupCheckboxesTemplate,
        formGroupConfirmTemplate,
        formGroupDatePickerTemplate,
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

export { Checkboxes, Confirm, DatePicker, Files, Input, NoFiles, Radios, SearchBar, Select, Static, Textarea };
