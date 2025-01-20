import { type Meta } from "@storybook/angular";
import { DatePickerLegacyArgs, datePickerLegacyMeta, datePickerLegacyStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { isStoryFnAngularReturnTypeTemplate } from "../helpers";

import readme from "./readme.md?raw";
import {
  datePickerLegacyShowByScriptingTemplate,
  datePickerLegacyWithLabelTemplate,
} from "./date-picker-legacy.content";
import { DsoDatePickerLegacy } from "../../projects/component-library/src/public-api";

const meta: Meta<DatePickerLegacyArgs> = {
  ...datePickerLegacyMeta({ readme }),
  component: DsoDatePickerLegacy,
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

export { Default, Disabled, Invalid, WithValue, WithMinAndMax, MonthRange, WithLabel, NarrowInput };
