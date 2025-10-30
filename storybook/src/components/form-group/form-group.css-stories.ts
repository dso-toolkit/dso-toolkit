import { Meta } from "@storybook/web-components-vite";
import { FormGroupArgs, formGroupMeta, formGroupStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/form-group/readme.md?raw";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

const meta: Meta<FormGroupArgs> = {
  ...formGroupMeta({ readme }),
  title: "HTML|CSS/Form Group",
};

export default meta;

const { Checkboxes, Confirm, DatePicker, Files, NoFiles, Input, Radios, SearchBar, Select, Static, Textarea } =
  formGroupStories({
    templateContainer,
    storyTemplates: (templates) => {
      const {
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
      } = templates;

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
