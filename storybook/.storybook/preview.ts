import { Preview } from "@storybook/web-components";
import { StoryRoot } from "dso-toolkit";

const preview: Preview = {
  parameters: {
    html: {
      root: "#root-inner", // default: #root
      removeEmptyComments: true, // default: false
      removeComments: /\?.*/, // default: false
    },
    options: {
      storySort: {
        method: "alphabetically",
        order: [StoryRoot.HtmlCss, StoryRoot.Core],
      },
    },
  },
};

export default preview;
