import { Meta, StoryObj } from "@storybook/web-components-vite";
import { fn } from "storybook/test";

import { InfoButtonArgs, infoButtonArgTypes, infoButtonArgsMapper } from "./info-button.args.js";
import { children } from "./info-button.content.js";
import { infoButtonTemplate } from "./info-button.template.js";

type InfoButtonStory = StoryObj<InfoButtonArgs>;

const meta: Meta<InfoButtonArgs> = {
  title: "Core/Info Button",
  tags: ["!autodocs"],
  argTypes: infoButtonArgTypes,
  args: {
    label: "Toelichting bij vraag",
    dsoToggle: fn(),
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => infoButtonTemplate(infoButtonArgsMapper(args, children())),
};

export default meta;

export const Default: InfoButtonStory = {};

export const Information: InfoButtonStory = {};
