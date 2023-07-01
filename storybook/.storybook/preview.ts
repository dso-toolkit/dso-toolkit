import { Preview } from "@storybook/web-components";

const preview: Preview = {
  parameters: {
    html: {
      root: "#root-inner", // default: #root
      removeEmptyComments: true, // default: false
    },
  },
};

export default preview;
