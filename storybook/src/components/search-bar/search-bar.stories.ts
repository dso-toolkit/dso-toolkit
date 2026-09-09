import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/search-bar/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { SearchBarArgs, searchBarArgTypes, searchBarArgsMapper } from "./search-bar.args.js";
import { searchBarTemplate } from "./search-bar.template.js";

type SearchBarStory = StoryObj<SearchBarArgs, Renderer>;

const defaultArgs: SearchBarArgs = {
  id: "search-bar-id",
  label: "Label",
  icon: true,
  hiddenLabel: false,
  invalid: false,
  placeholder: "Bv. boomkap",
  value: "",
  buttonLabel: "Zoeken",
  hideSearchButton: false,
  ariaDescribedBy: "",
  ariaErrorMessage: "",
  resultsMessage: "",
  resultsHidden: false,
};

const meta: Meta<SearchBarArgs> = {
  title: "HTML|CSS/Search Bar",
  argTypes: searchBarArgTypes,
  args: defaultArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: SearchBarArgs) => searchBarTemplate(searchBarArgsMapper(args));

export const VisualLabelWithIcon: SearchBarStory = {
  args: defaultArgs,
  render,
};

export const VisualLabelWithoutIcon: SearchBarStory = {
  args: { ...defaultArgs, icon: false },
  render,
};

export const PlaceholderWithLongText: SearchBarStory = {
  args: {
    ...defaultArgs,
    placeholder:
      "Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text.",
  },
  render,
};

export const HiddenLabelWithIcon: SearchBarStory = {
  args: { ...defaultArgs, hiddenLabel: true },
  render,
};

export const HiddenLabelWithoutIcon: SearchBarStory = {
  args: { ...defaultArgs, hiddenLabel: true, icon: false },
  render,
};

export const WithValue: SearchBarStory = {
  args: { ...defaultArgs, value: "Laan van Eik en Duinen 155" },
  render,
};

export const Invalid: SearchBarStory = {
  args: {
    ...defaultArgs,
    invalid: true,
  },
  render,
};

export const HiddenButton: SearchBarStory = {
  args: {
    ...defaultArgs,
    hideSearchButton: true,
  },
  render,
};

export const WithResultsMessage: SearchBarStory = {
  args: {
    ...defaultArgs,
    resultsMessage: "7 gevonden resultaten",
  },
  render,
};

export const WithHiddenResultsMessage: SearchBarStory = {
  args: {
    ...defaultArgs,
    resultsMessage: "7 gevonden resultaten",
    resultsHidden: true,
  },
  render,
};
