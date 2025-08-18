import readme from "@dso-toolkit/core/src/components/date-picker-legacy/readme.md?raw";
import { type Meta } from "@storybook/web-components-vite";
import { DatePickerLegacyArgs, datePickerLegacyMeta, datePickerLegacyStories } from "dso-toolkit";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

import {
  datePickerLegacyShowByScriptingTemplate,
  datePickerLegacyWithLabelTemplate,
} from "./date-picker-legacy.content";

const meta: Meta<DatePickerLegacyArgs> = {
  ...datePickerLegacyMeta({ readme }),
  title: "Core/Date Picker (Legacy) (Deprecated)",
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

export { Default, Disabled, Invalid, MonthRange, NarrowInput, ShowByScripting, WithLabel, WithMinAndMax, WithValue };
