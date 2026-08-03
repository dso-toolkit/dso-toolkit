import { Meta } from "@storybook/web-components-vite";
import { SearchBarArgs, searchBarMeta, searchBarStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/search-bar/readme.md?raw";

import { searchBarTemplate } from "./search-bar.css-template";

const meta: Meta<SearchBarArgs> = {
  ...searchBarMeta({ readme }),
  title: "HTML|CSS/Search Bar",
};

export default meta;

const {
  VisualLabelWithIcon,
  VisualLabelWithoutIcon,
  PlaceholderWithLongText,
  HiddenLabelWithIcon,
  HiddenLabelWithoutIcon,
  WithValue,
  Invalid,
  HiddenButton,
  WithResultsMessage,
  WithHiddenResultsMessage,
} = searchBarStories({
  storyTemplates: () => {
    return {
      searchBarTemplate,
    };
  },
});

export {
  HiddenButton,
  HiddenLabelWithIcon,
  HiddenLabelWithoutIcon,
  Invalid,
  PlaceholderWithLongText,
  VisualLabelWithIcon,
  VisualLabelWithoutIcon,
  WithHiddenResultsMessage,
  WithResultsMessage,
  WithValue,
};
