import readme from "@dso-toolkit/core/src/components/scrollable/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { ScrollableArgs, scrollableArgTypes, scrollableArgsMapper } from "./scrollable.args.js";
import { defaultContent, dynamicContent } from "./scrollable.content.js";
import { scrollableTemplate } from "./scrollable.template.js";

type ScrollableStory = StoryObj<ScrollableArgs, Renderer>;

const meta: Meta<ScrollableArgs> = {
  title: "Core/Scrollable",
  argTypes: scrollableArgTypes,
  args: {
    dsoScrollEnd: fn(),
  },
  decorators: [
    (story) =>
      html` <div id="scrollable-mock" style="background-color: #efefef; height: 100vh; max-width: 500px">
        ${story()}
      </div>`,
  ],
  parameters: {
    html: {
      root: "#scrollable-mock",
    },
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: ScrollableStory = {
  render: (args) => scrollableTemplate(scrollableArgsMapper(args, defaultContent)),
  parameters: {
    layout: "fullscreen",
  },
};

export const DynamicContent: ScrollableStory = {
  render: (args) => scrollableTemplate(scrollableArgsMapper(args, dynamicContent)),
  parameters: {
    layout: "fullscreen",
  },
};
