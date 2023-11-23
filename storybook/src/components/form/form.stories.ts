import { storiesOfForm, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import readme from "dso-toolkit/src/components/form/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfForm(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  ({
    formTemplate,
    formGroupCheckboxesTemplate,
    formGroupConfirmTemplate,
    formGroupDatePickerTemplate,
    formGroupDatePickerLegacyTemplate,
    formGroupFilesTemplate,
    formGroupInputTemplate,
    formGroupInputNumberTemplate,
    formGroupRadiosTemplate,
    formGroupSearchBarTemplate,
    formGroupSelectTemplate,
    formGroupStaticTemplate,
    formGroupTextareaTemplate,
  }) => ({
    formTemplate,
    formGroupCheckboxesTemplate,
    formGroupConfirmTemplate,
    formGroupDatePickerTemplate,
    formGroupDatePickerLegacyTemplate,
    formGroupFilesTemplate,
    formGroupInputTemplate,
    formGroupInputNumberTemplate,
    formGroupRadiosTemplate,
    formGroupSearchBarTemplate,
    formGroupSelectTemplate,
    formGroupStaticTemplate,
    formGroupTextareaTemplate,
  }),
  {
    formGroupDecorator: (story) =>
      html`<form>
        <fieldset>
          <legend>Example</legend>
          ${story()}
        </fieldset>
      </form>`,
  },
);
