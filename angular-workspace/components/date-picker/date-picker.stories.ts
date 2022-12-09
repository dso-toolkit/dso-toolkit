import { storiesOf } from "@storybook/angular";

import { storiesOfDatePicker } from "dso-toolkit";
import { DsoDatePicker } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { datePickerShowByScriptingTemplate, datePickerWithLabelTemplate } from "./date-picker.content";

import readme from "./readme.md";

storiesOfDatePicker(
  {
    parameters: {
      module,
      storiesOf,
      readme,
      storyApiOptions: {
        parameters: [
          {
            component: DsoDatePicker,
          },
        ],
      },
    },
    templateContainer,
    storyTemplates: ({ datePickerTemplate }) => ({
      datePickerTemplate,
      datePickerWithLabelTemplate,
      datePickerShowByScriptingTemplate,
    }),
  },
  {
    decorator: (story) => ({ template: `<div style="width: 175px;">${story().template}</div>` }),
  }
);
