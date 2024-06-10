import React from "react";
import { type Meta } from "@storybook/react";

import { DatePickerArgs, DatePickerDecorator, datePickerMeta, datePickerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/date-picker/readme.md?raw";

import { datePickerWithLabelTemplate } from "./date-picker.content";

const decorator: DatePickerDecorator<JSX.Element> = (story) => (
  <>
    {/*
    // @ts-expect-error on story(): TS2571: Object is of type `unknown` */}
    <div style={{ width: "175px" }}>{story()}</div>
  </>
);

const meta: Meta<DatePickerArgs> = {
  ...datePickerMeta({ readme }),
  title: "Date Picker",
};

export default meta;

const { Default, MonthRange, WithLabel, WithValue, WithMinAndMax, NarrowInput, Disabled, Invalid } = datePickerStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { datePickerTemplate } = templates;

    return {
      datePickerTemplate,
      datePickerWithLabelTemplate,
    };
  },
  decorator,
});

export { Default, Disabled, Invalid, WithValue, WithMinAndMax, MonthRange, WithLabel, NarrowInput };
