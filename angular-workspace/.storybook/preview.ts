import { setCompodocJson } from "@storybook/addon-docs/angular";
import { Parameters } from "@storybook/types";

import * as docJson from "../documentation.json";

import "@iframe-resizer/child";

setCompodocJson(docJson);

export const parameters: Parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
  options: {
    storySort: {
      method: "alphabetically",
    },
  },
};
