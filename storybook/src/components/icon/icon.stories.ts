import readme from "@dso-toolkit/core/src/components/icon/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import icons from "../../../assets/icons.json";
import { StoryObj } from "../../shared/story-obj.js";

import { decorator } from "./icon-overview.decorator";
import { IconArgs, iconArgTypes, iconArgsMapper } from "./icon.args.js";
import { iconTemplate } from "./icon.template.js";

type IconStory = StoryObj<IconArgs, Renderer>;

const meta: Meta<IconArgs> = {
  title: "Core/Icon",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args) => iconTemplate(iconArgsMapper(args)),
};

export default meta;

export const Default: IconStory = {
  argTypes: iconArgTypes(icons),
  args: {
    icon: "user-solid",
  },
};

export const Overview: IconStory = {
  decorators: [(story) => (decorator ? decorator(story, icons) : story)],
};
