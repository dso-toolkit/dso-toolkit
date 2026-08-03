import readme from "@dso-toolkit/core/src/components/icon-button/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import icons from "../../../assets/icons.json";
import { StoryObj } from "../../shared/story-obj.js";

import { IconButtonArgs, iconButtonArgTypes, iconButtonArgs } from "./icon-button.args.js";
import { iconButtonTemplate } from "./icon-button.template.js";

type IconButtonStory = StoryObj<IconButtonArgs, Renderer>;

const meta: Meta<IconButtonArgs> = {
  title: "Core/Icon Button",
  args: iconButtonArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const argTypes = iconButtonArgTypes(icons);
const parameters = {
  layout: "centered",
};
const render = (args: IconButtonArgs) => iconButtonTemplate(args);

export const Secondary: IconButtonStory = { argTypes, parameters, render };

export const Tertiary: IconButtonStory = {
  argTypes,
  parameters,
  args: {
    variant: "tertiary",
  },
  render,
};

export const Map: IconButtonStory = {
  argTypes,
  parameters,
  args: {
    variant: "map",
  },
  render,
};
