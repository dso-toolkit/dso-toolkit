import { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/search-bar/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";

import { SearchBarArgs, searchBarArgTypes, searchBarArgsMapper } from "./search-bar.args.js";
import { searchBarTemplate } from "./search-bar.template.js";

type SearchBarStory = StoryObj<SearchBarArgs>;

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
  render: (args) => searchBarTemplate(searchBarArgsMapper(args)),
};

export default meta;

export const VisualLabelWithIcon: SearchBarStory = {
  args: defaultArgs,
};

export const VisualLabelWithoutIcon: SearchBarStory = {
  args: { ...defaultArgs, icon: false },
};

export const PlaceholderWithLongText: SearchBarStory = {
  args: {
    ...defaultArgs,
    placeholder:
      "Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text. Placeholder with long text, long text, long text.",
  },
};

export const HiddenLabelWithIcon: SearchBarStory = {
  args: { ...defaultArgs, hiddenLabel: true },
};

export const HiddenLabelWithoutIcon: SearchBarStory = {
  args: { ...defaultArgs, hiddenLabel: true, icon: false },
};

export const WithValue: SearchBarStory = {
  args: { ...defaultArgs, value: "Laan van Eik en Duinen 155" },
};

export const Invalid: SearchBarStory = {
  args: {
    ...defaultArgs,
    invalid: true,
  },
};

export const HiddenButton: SearchBarStory = {
  args: {
    ...defaultArgs,
    hideSearchButton: true,
  },
};

export const WithResultsMessage: SearchBarStory = {
  args: {
    ...defaultArgs,
    resultsMessage: "7 gevonden resultaten",
  },
};

export const WithHiddenResultsMessage: SearchBarStory = {
  args: {
    ...defaultArgs,
    resultsMessage: "7 gevonden resultaten",
    resultsHidden: true,
  },
};
