import { Meta } from "@storybook/web-components";
import { SearchBarArgs, searchBarMeta, searchBarStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/search-bar/readme.md?raw";

import { templateContainer } from "../../templates";

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
  templateContainer,
  storyTemplates: (templates) => {
    const { searchBarTemplate } = templates;

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
