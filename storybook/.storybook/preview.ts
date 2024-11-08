import { Preview } from "@storybook/web-components";
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
  decorators: [(story, context) => i18nDecorator(story, context)],
  parameters: {
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
  },
};

export default preview;
