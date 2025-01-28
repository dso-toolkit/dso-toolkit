import { storiesOfFormGroup, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import readme from "dso-toolkit/src/components/form-group/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfFormGroup(
  {
    module,
    storiesOf,
    readme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  ({
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
  }) => ({
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
  }),
  {
    formGroupDecorator: (story) => html`<form>${story()}</form>`,
  },
);
