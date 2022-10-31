import * as React from "react";
import { storiesOfDatePicker } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";
import {
  datePickerShowByScriptingTemplate,
  datePickerWithLabelTemplate,
} from "./date-picker.react-template";

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
      datePickerShowByScriptingTemplate,
    }),
  },
  {
    decorator: (story) => <div style={{ width: "175px" }}>{story()}</div>,
  }
);
