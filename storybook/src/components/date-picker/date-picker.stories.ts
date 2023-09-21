import { storiesOfDatePicker, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import readme from "@dso-toolkit/core/src/components/date-picker/readme.md?raw";

import { templateContainer } from "../../templates";
import { datePickerWithLabelTemplate } from "./date-picker.content";

storiesOfDatePicker(
  {
    parameters: {
      module,
      storiesOf,
      readme,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ datePickerTemplate }) => ({
      datePickerTemplate,
      datePickerWithLabelTemplate,
    }),
  },
  {
    decorator: (story) => html`<div style="width: 175px;">${story()}</div>`,
  }
);
