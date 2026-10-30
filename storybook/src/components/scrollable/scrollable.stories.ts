import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { fn } from "storybook/test";

import { ScrollableArgs, scrollableArgTypes, scrollableArgsMapper } from "./scrollable.args.js";
import { defaultContent, dynamicContent } from "./scrollable.content.js";
import { scrollableTemplate } from "./scrollable.template.js";

type ScrollableStory = StoryObj<ScrollableArgs>;

const meta: Meta<ScrollableArgs> = {
  title: "Core/Scrollable",
  tags: ["!autodocs"],
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
  },
};

export default meta;

export const Default: ScrollableStory = {
  render: (args) => scrollableTemplate(scrollableArgsMapper(args, defaultContent())),
  parameters: {
    layout: "fullscreen",
  },
};

export const DynamicContent: ScrollableStory = {
  render: (args) => scrollableTemplate(scrollableArgsMapper(args, dynamicContent())),
  parameters: {
    layout: "fullscreen",
  },
};
