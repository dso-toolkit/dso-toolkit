import { defineCustomElements } from "@dso-toolkit/core/dist/bundle/index.js";
import "@iframe-resizer/child";
import { DecoratorFunction, GlobalTypes, Parameters } from "@storybook/types";
// @ts-expect-error: This import is used to load the DSO icons sprite into the document, but it is not a module.
import sprite from "dso-toolkit/dist/dso-icons.svg?raw";

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
};

export const decorators: DecoratorFunction[] = [(story, context) => i18nDecorator(story, context)];

export const parameters: Parameters = {
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
};

const spriteContainer = document.createElement("div");
spriteContainer.hidden = true;
spriteContainer.insertAdjacentHTML("afterbegin", sprite);
document.body.insertAdjacentElement("afterbegin", spriteContainer);

defineCustomElements();
