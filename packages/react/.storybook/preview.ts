import { Parameters } from "@storybook/types";

import "@iframe-resizer/child";
import "dso-toolkit/dist/dso.css";

export const parameters: Parameters = {
  options: {
    storySort: {
      method: "alphabetically",
    },
  },
};

export const tags = ["autodocs"];
