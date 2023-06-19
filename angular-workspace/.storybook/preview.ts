import { setCompodocJson } from "@storybook/addon-docs/angular";
import { Preview } from "@storybook/angular";

import * as docJson from "../documentation.json";

setCompodocJson(docJson);

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: { inlineStories: true },
  },
};

export default preview;
