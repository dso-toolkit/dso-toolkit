import { Meta, StoryObj } from "@storybook/web-components-vite";

import icons from "../../../assets/icons.json";

import { decorator } from "./icon-overview.decorator.js";
import { IconArgs, iconArgTypes, iconArgsMapper } from "./icon.args.js";
import { iconTemplate } from "./icon.template.js";

type IconStory = StoryObj<IconArgs>;

const meta: Meta<IconArgs> = {
  title: "Core/Icon",
  tags: ["!autodocs"],

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
  decorators: [decorator],
};
