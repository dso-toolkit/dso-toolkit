import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/button/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { ButtonArgs, buttonArgTypes, buttonArgsMapper } from "./button.args.js";
import { buttonTemplate } from "./button.template.js";

type ButtonStory = StoryObj<ButtonArgs, Renderer>;

const meta: Meta<ButtonArgs> = {
  title: "HTML|CSS/Button",
  argTypes: buttonArgTypes,
  args: {
    element: "button",
    click: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: ButtonArgs) => buttonTemplate(buttonArgsMapper(args));

export const Primary: ButtonStory = {
  argTypes: {
    iconMode: {
      options: [undefined, "after"],
    },
  },
  args: {
    variant: "primary",
    label: "Primary button",
  },
  render,
};

export const PrimaryCompact: ButtonStory = {
  args: {
    variant: "primary",
    label: "Primary button",
    compact: true,
  },
  render,
};

export const Secondary: ButtonStory = {
  args: {
    variant: "secondary",
    label: "Secondary button",
  },
  render,
};

export const Tertiary: ButtonStory = {
  args: {
    variant: "tertiary",
    label: "Tertiary button",
  },
  render,
};

export const Map: ButtonStory = {
  args: {
    variant: "map",
    label: "Map button",
  },
  render,
};
