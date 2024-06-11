import React from "react";
import { type Meta } from "@storybook/react";

import {
  DatePickerLegacyArgs,
  DatePickerLegacyDecorator,
  datePickerLegacyMeta,
  datePickerLegacyStories,
} from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/date-picker/readme.md?raw";

import {
  datePickerLegacyWithLabelTemplate,
  datePickerLegacyShowByScriptingTemplate,
} from "./date-picker-legacy.react-template";

const decorator: DatePickerLegacyDecorator<JSX.Element> = (story) => (
  <>
    {/*
    // @ts-expect-error on story(): TS2571: Object is of type `unknown` */}
    <div style={{ width: "175px" }}>{story()}</div>
  </>
);

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

export { Default, Disabled, Invalid, WithValue, WithMinAndMax, MonthRange, WithLabel, NarrowInput, ShowByScripting };
