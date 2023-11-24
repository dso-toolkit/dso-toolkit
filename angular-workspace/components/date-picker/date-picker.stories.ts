import { storiesOf } from "@storybook/angular";

import { storiesOfDatePicker } from "dso-toolkit";

import { DsoDatePicker } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { datePickerWithLabelTemplate } from "./date-picker.content";

import readme from "./readme.md?raw";

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
    }),
  },
  {
    decorator: (story) => ({ template: `<div style="width: 175px;">${story().template}</div>` }),
  },
);
