import { type Meta, moduleMetadata } from "@storybook/angular";
import { DatePickerArgs, datePickerMeta, datePickerStories } from "dso-toolkit";

import { DsoDatePicker } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import { datePickerWithLabelTemplate } from "./date-picker.content";
import readme from "./readme.md?raw";

const meta: Meta<DatePickerArgs> = {
  ...datePickerMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoDatePicker],
    }),
  ],
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
  decorator: (story) => {
    const s = story();
    return { template: `<div style="width: 175px;">${s.template}</div>` };
  },
});

export { Default, Disabled, Invalid, MonthRange, NarrowInput, WithLabel, WithMinAndMax, WithValue };
