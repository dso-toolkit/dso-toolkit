import { storiesOfDatePickerLegacy, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";

import cssReadme from "@dso-toolkit/core/src/components/date-picker-legacy/readme.md?raw";

import {
  datePickerLegacyShowByScriptingTemplate,
  datePickerLegacyWithLabelTemplate,
} from "./date-picker-legacy.content";
import { templateContainer } from "../../templates";

storiesOfDatePickerLegacy(
  {
    parameters: {
      module,
      storiesOf,
      readme: cssReadme,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ datePickerLegacyTemplate }) => ({
      datePickerLegacyTemplate,
      datePickerLegacyWithLabelTemplate,
      datePickerLegacyShowByScriptingTemplate,
    }),
  },
  {
    decorator: (story) => html`<div style="width: 175px;">${story()}</div>`,
  },
);
