import readme from "@dso-toolkit/core/src/components/date-picker/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { StoryObj } from "../../shared/story-obj.js";

import { DatePickerArgs, datePickerArgTypes, datePickerArgsMapper } from "./date-picker.args.js";
import { datePickerWithLabelTemplate } from "./date-picker.content.js";
import { datePickerTemplate } from "./date-picker.template.js";

type DatePickerStory = StoryObj<DatePickerArgs, Renderer>;

const meta: Meta<DatePickerArgs> = {
  title: "Core/Date Picker",
  argTypes: datePickerArgTypes,
  args: {
    label: "Datum",
    disabled: false,
    dsoDateChange: fn(),
    dsoBlur: fn(),
    dsoFocus: fn(),
    dsoKeyDown: fn(),
    dsoKeyUp: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
    options: {
      enableShortcuts: false,
    },
  },
};

export default meta;

const render = (args: DatePickerArgs) => datePickerTemplate(datePickerArgsMapper(args));

export const Default: DatePickerStory = {
  render,
};

export const Disabled: DatePickerStory = {
  args: {
    disabled: true,
  },
  render,
};

export const Invalid: DatePickerStory = {
  args: {
    invalid: true,
  },
  render,
};

export const MonthRange: DatePickerStory = {
  args: {
    min: "3-8-2020",
    max: "28-3-2022",
  },
  render,
};

export const NarrowInput: DatePickerStory = {
  decorators: [(story) => html`<div style="width: 175px;">${story()}</div>`],
  render,
};

export const WithLabel: DatePickerStory = {
  args: {
    id: uuidv4(),
  },
  render: (args) =>
    datePickerWithLabelTemplate(datePickerTemplate(datePickerArgsMapper(args)), args.id || uuidv4(), "Selecteer datum"),
};

export const WithMinAndMax: DatePickerStory = {
  args: {
    min: "3-1-2020",
    max: "28-1-2020",
  },
  render,
};

export const WithValue: DatePickerStory = {
  args: {
    value: "15-11-2020",
  },
  render,
};
