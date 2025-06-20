import { setCompodocJson } from "@storybook/addon-docs/angular";
import { Parameters } from "@storybook/types";
import "@iframe-resizer/child";

import * as docJson from "../documentation.json";

setCompodocJson(docJson);

export const parameters: Parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true, codePanel: true },
  options: {
    storySort: {
      method: "alphabetically",
    },
  },
};

export const tags = ["autodocs"];
