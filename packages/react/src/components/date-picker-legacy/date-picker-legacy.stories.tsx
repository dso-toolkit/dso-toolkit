import readme from "@dso-toolkit/core/src/components/date-picker/readme.md?raw";
import { type Meta } from "@storybook/react";
import {
  DatePickerLegacyArgs,
  DatePickerLegacyDecorator,
  datePickerLegacyMeta,
  datePickerLegacyStories,
} from "dso-toolkit";
import React from "react";

import { templateContainer } from "../../templates";

import {
  datePickerLegacyShowByScriptingTemplate,
  datePickerLegacyWithLabelTemplate,
} from "./date-picker-legacy.react-template";

const decorator: DatePickerLegacyDecorator<JSX.Element> = (story) => {
  const s = story();
  if (!React.isValidElement(s)) {
    throw new Error("Expected a valid JSX element");
  }

  return (
    <>
      <div style={{ width: "175px" }}>{s}</div>
    </>
  );
};

const meta: Meta<DatePickerLegacyArgs> = {
  ...datePickerLegacyMeta({ readme }),
  title: "Date Picker (Legacy)",
};

export default meta;

const { Default, MonthRange, WithLabel, WithValue, WithMinAndMax, NarrowInput, Disabled, Invalid, ShowByScripting } =
  datePickerLegacyStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { datePickerLegacyTemplate } = templates;

      return {
        datePickerLegacyTemplate,
        datePickerLegacyWithLabelTemplate,
        datePickerLegacyShowByScriptingTemplate,
      };
    },
    decorator,
  });

export { Default, Disabled, Invalid, MonthRange, NarrowInput, ShowByScripting, WithLabel, WithMinAndMax, WithValue };
