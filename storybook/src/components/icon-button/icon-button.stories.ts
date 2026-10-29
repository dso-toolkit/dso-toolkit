import { Meta, StoryObj } from "@storybook/web-components-vite";

import icons from "../../../assets/icons.json";

import { IconButtonArgs, iconButtonArgTypes, iconButtonArgs } from "./icon-button.args.js";
import { iconButtonTemplate } from "./icon-button.template.js";

type IconButtonStory = StoryObj<IconButtonArgs>;

const meta: Meta<IconButtonArgs> = {
  title: "Core/Icon Button",
  tags: ["!autodocs"],
  args: iconButtonArgs,
  render: (args) => iconButtonTemplate(args),
};

export default meta;

const argTypes = iconButtonArgTypes(icons);
const parameters = {
  layout: "centered",
};

export const Secondary: IconButtonStory = { argTypes, parameters };

export const Tertiary: IconButtonStory = {
  argTypes,
  parameters,
  args: {
    variant: "tertiary",
  },
};

export const Map: IconButtonStory = {
  argTypes,
  parameters,
  args: {
    variant: "map",
  },
};
