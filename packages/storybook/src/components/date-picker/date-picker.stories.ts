import { storiesOfDatePicker } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import cssReadme from "@dso-toolkit/core/src/components/date-picker/readme.md";

import { datePickerShowByScriptingTemplate, datePickerWithLabelTemplate } from "./date-picker.content";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";

storiesOfDatePicker(
  {
    parameters: {
      module,
      storiesOf,
      readme: cssReadme,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ datePickerTemplate }) => ({
      datePickerTemplate,
      datePickerWithLabelTemplate,
      datePickerShowByScriptingTemplate,
    }),
  },
  {
    decorator: (story) => html`<div style="width: 175px;">${story()}</div>`,
  }
);
