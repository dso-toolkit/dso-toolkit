import readme from "@dso-toolkit/core/src/components/info-button/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { fn } from "storybook/test";

import { InfoButtonArgs, infoButtonArgTypes, infoButtonArgsMapper } from "./info-button.args.js";
import { children } from "./info-button.content.js";
import { infoButtonTemplate } from "./info-button.template.js";

type InfoButtonStory = StoryObj<InfoButtonArgs>;

const meta: Meta<InfoButtonArgs> = {
  title: "Core/Info Button",
  argTypes: infoButtonArgTypes,
  args: {
    label: "Toelichting bij vraag",
    dsoToggle: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
    layout: "centered",
  },
  render: (args) => infoButtonTemplate(infoButtonArgsMapper(args, children())),
};

export default meta;

export const Default: InfoButtonStory = {};

export const Information: InfoButtonStory = {};
