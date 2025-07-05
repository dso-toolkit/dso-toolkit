import readme from "@dso-toolkit/core/src/components/date-picker/readme.md?raw";
import { type Meta } from "@storybook/web-components-vite";
import { DatePickerArgs, datePickerMeta, datePickerStories } from "dso-toolkit";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

import { datePickerWithLabelTemplate } from "./date-picker.content";

const meta: Meta<DatePickerArgs> = {
  ...datePickerMeta({ readme }),
  title: "Core/Date Picker",
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
  decorator: (story) => html`<div style="width: 175px;">${story()}</div>`,
});

export { Default, Disabled, Invalid, MonthRange, NarrowInput, WithLabel, WithMinAndMax, WithValue };
