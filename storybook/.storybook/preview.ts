import { defineCustomElements } from "@dso-toolkit/core/dist/bundle/index.js";
import { Preview } from "@storybook/web-components-vite";
import "@iframe-resizer/child";

import "dso-toolkit/dist/dso.css";

import { i18nDecorator } from "./i18n.decorator";

const preview: Preview = {
  globalTypes: {
    locale: {
      description: "Internationalization locale",
      defaultValue: "nl",
      toolbar: {
        icon: "globe",
        items: [
          { value: "nl", left: "🇳🇱", title: "Nederlands" },
          { value: "en", left: "🇬🇧", title: "English" },
        ],
      },
    },
  },
  initialGlobals: {
    locale: "nl",
  },
  decorators: [i18nDecorator],
  parameters: {
    controls: {
      disableSaveFromUI: true,
    },
    html: {
      root: "#dt-i18n-decorator-container", // default: #root
      removeEmptyComments: true, // default: false
      removeComments: /\?.*/, // default: false
    },
    options: {
      storySort: {
        method: "alphabetically",
        order: ["HTML|CSS", "Core"],
      },
    },
    docs: {
      codePanel: true,
      source: {
        excludeDecorators: true,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;

defineCustomElements();
