import readme from "@dso-toolkit/core/src/components/date-picker/readme.md?raw";
import { type Meta } from "@storybook/react-vite";
import { DatePickerArgs, DatePickerDecorator, datePickerMeta, datePickerStories } from "dso-toolkit";
import React from "react";

import { templateContainer } from "../../templates";

import { datePickerWithLabelTemplate } from "./date-picker.content";

const decorator: DatePickerDecorator<JSX.Element> = (story) => {
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

export { Default, Disabled, Invalid, MonthRange, NarrowInput, WithLabel, WithMinAndMax, WithValue };
