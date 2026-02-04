import { Parameters } from "storybook/internal/types";

import "@iframe-resizer/child";
import "dso-toolkit/dist/dso.css";

export const parameters: Parameters = {
  controls: {
    disableSaveFromUI: true,
  },
  options: {
    storySort: {
      method: "alphabetically",
    },
  },
  docs: {
    codePanel: true,
    source: {
      excludeDecorators: true,
      type: "dynamic",
    },
  },
};

export const tags = ["autodocs"];
