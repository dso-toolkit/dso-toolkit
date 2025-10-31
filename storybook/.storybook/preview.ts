import { defineCustomElements } from "@dso-toolkit/core/dist/bundle/index.js";
import { DecoratorFunction, GlobalTypes, Parameters } from "storybook/internal/types";
import "@iframe-resizer/child";

import "dso-toolkit/dist/dso.css";

import { i18nDecorator } from "./i18n.decorator";

export const globalTypes: GlobalTypes = {
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
  initialGlobals: { locale: "nl" },
};

export const decorators: DecoratorFunction[] = [(story, context) => i18nDecorator(story, context)];

export const parameters: Parameters = {
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
};

export const tags = ["autodocs"];

defineCustomElements();
