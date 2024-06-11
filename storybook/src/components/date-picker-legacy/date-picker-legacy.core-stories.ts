import { type Meta } from "@storybook/web-components";
import { DatePickerLegacyArgs, datePickerLegacyMeta, datePickerLegacyStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/date-picker-legacy/readme.md?raw";
import { html } from "lit-html";
import {
  datePickerLegacyWithLabelTemplate,
  datePickerLegacyShowByScriptingTemplate,
} from "./date-picker-legacy.content";

const meta: Meta<DatePickerLegacyArgs> = {
  ...datePickerLegacyMeta({ readme }),
  title: "Core/Date Picker (Legacy)",
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
    decorator: (story) => html`<div style="width: 175px;">${story()}</div>`,
  });

export { Default, Disabled, Invalid, WithValue, WithMinAndMax, MonthRange, WithLabel, ShowByScripting, NarrowInput };
