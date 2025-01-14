import { type Meta } from "@storybook/angular";
import { DatePickerArgs, datePickerMeta, datePickerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { isStoryFnAngularReturnTypeTemplate } from "../helpers";

import readme from "./readme.md?raw";
import { datePickerWithLabelTemplate } from "./date-picker.content";
import { DsoDatePicker } from "../../projects/component-library/src/public-api";

const meta: Meta<DatePickerArgs> = {
  ...datePickerMeta({ readme }),
  component: DsoDatePicker,
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
    if (!isStoryFnAngularReturnTypeTemplate(s)) {
      throw new Error("Expected a valid Angular template");
    }

    return { template: `<div style="width: 175px;">${s.template}</div>` };
  },
});

export { Default, Disabled, Invalid, WithValue, WithMinAndMax, MonthRange, WithLabel, NarrowInput };
