import { setCompodocJson } from "@storybook/addon-docs/angular";
import { Parameters } from "storybook/internal/types";
import "@iframe-resizer/child";

import * as docJson from "../documentation.json";

setCompodocJson(docJson);

export const parameters: Parameters = {
  controls: {
    disableSaveFromUI: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    inlineStories: true,
    codePanel: true,
    source: {
      excludeDecorators: true,
    },
  },
  options: {
    storySort: {
      method: "alphabetically",
    },
  },
};

export const tags = ["autodocs"];
