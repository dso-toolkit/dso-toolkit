import { Preview } from "@storybook/web-components";

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
        order: ["HTML|CSS", "Core"],
      },
    },
  },
};

export default preview;
