import * as React from "react";
import { storiesOfDatePicker } from "dso-toolkit";
import { storiesOf } from "@storybook/react";

import readme from "./readme.md?raw";

import { templateContainer } from "../../templates";
import { datePickerWithLabelTemplate } from "./date-picker.content";

storiesOfDatePicker(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ datePickerTemplate }) => ({
      datePickerTemplate,
      datePickerWithLabelTemplate,
    }),
  },
  {
    decorator: (story) => <div style={{ width: "175px" }}>{story()}</div>,
  },
);
