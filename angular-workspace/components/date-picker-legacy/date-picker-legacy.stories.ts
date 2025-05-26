import { type Meta, moduleMetadata } from "@storybook/angular";
import { DatePickerLegacyArgs, datePickerLegacyMeta, datePickerLegacyStories } from "dso-toolkit";

import { DsoDatePickerLegacy } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { isStoryFnAngularReturnTypeTemplate } from "../helpers";

import {
  datePickerLegacyShowByScriptingTemplate,
  datePickerLegacyWithLabelTemplate,
} from "./date-picker-legacy.content";
import readme from "./readme.md?raw";

const meta: Meta<DatePickerLegacyArgs> = {
  ...datePickerLegacyMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoDatePickerLegacy],
    }),
  ],
  title: "Date Picker (Legacy)",
};

export default meta;

const { Default, MonthRange, WithLabel, WithValue, WithMinAndMax, NarrowInput, Disabled, Invalid } =
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
    decorator: (story) => {
      const s = story();
      if (!isStoryFnAngularReturnTypeTemplate(s)) {
        throw new Error("Expected a valid Angular template");
      }

      return { template: `<div style="width: 175px;">${s.template}</div>` };
    },
  });

export { Default, Disabled, Invalid, MonthRange, NarrowInput, WithLabel, WithMinAndMax, WithValue };
