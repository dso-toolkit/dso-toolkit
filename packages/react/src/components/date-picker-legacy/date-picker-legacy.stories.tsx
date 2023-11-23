import * as React from "react";
import { storiesOfDatePickerLegacy } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import {
  datePickerLegacyShowByScriptingTemplate,
  datePickerLegacyWithLabelTemplate,
} from "./date-picker-legacy.react-template";

storiesOfDatePickerLegacy(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ datePickerLegacyTemplate }) => ({
      datePickerLegacyTemplate,
      datePickerLegacyWithLabelTemplate,
      datePickerLegacyShowByScriptingTemplate,
    }),
  },
  {
    decorator: (story) => <div style={{ width: "175px" }}>{story()}</div>,
  },
);
