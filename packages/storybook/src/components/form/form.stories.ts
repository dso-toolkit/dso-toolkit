import { storiesOfForm } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import readme from "@dso-toolkit/css/src/components/form/readme.md";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
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
  }
);
