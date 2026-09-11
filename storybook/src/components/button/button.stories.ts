import type { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/button/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { ButtonArgs, buttonArgTypes, buttonArgsMapper } from "./button.args.js";
import { buttonTemplate } from "./button.template.js";

type ButtonStory = StoryObj<ButtonArgs>;

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
  render: (args) => buttonTemplate(buttonArgsMapper(args)),
};

export default meta;

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
};

export const PrimaryCompact: ButtonStory = {
  args: {
    variant: "primary",
    label: "Primary button",
    compact: true,
  },
};

export const Secondary: ButtonStory = {
  args: {
    variant: "secondary",
    label: "Secondary button",
  },
};

export const Tertiary: ButtonStory = {
  args: {
    variant: "tertiary",
    label: "Tertiary button",
  },
};

export const Map: ButtonStory = {
  args: {
    variant: "map",
    label: "Map button",
  },
};
