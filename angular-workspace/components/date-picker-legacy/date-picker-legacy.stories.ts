import { storiesOf } from "@storybook/angular";

import { storiesOfDatePickerLegacy } from "dso-toolkit";
import { DsoDatePickerLegacy } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import {
  datePickerLegacyShowByScriptingTemplate,
  datePickerLegacyWithLabelTemplate,
} from "./date-picker-legacy.content";

import readme from "./readme.md?raw";

storiesOfDatePickerLegacy(
  {
    parameters: {
      module,
      storiesOf,
      readme,
      storyApiOptions: {
        parameters: [
          {
            component: DsoDatePickerLegacy,
          },
        ],
      },
    },
    templateContainer,
    storyTemplates: ({ datePickerLegacyTemplate }) => ({
      datePickerLegacyTemplate,
      datePickerLegacyWithLabelTemplate,
      datePickerLegacyShowByScriptingTemplate,
    }),
  },
  {
    decorator: (story) => ({ template: `<div style="width: 175px;">${story().template}</div>` }),
  }
);
