import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/description/readme.md?raw";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  DescriptionArgs,
  DescriptionExampleArgs,
  descriptionArgTypes,
  descriptionArgsMapper,
  descriptionExampleArgTypes,
} from "./description.args.js";
import { descriptionExample, termContent } from "./description.content.js";
import { descriptionTemplate } from "./description.template.js";

type DescriptionStory = StoryObj<DescriptionArgs, Renderer>;
type DescriptionExampleStory = StoryObj<DescriptionExampleArgs, Renderer>;

const meta: Meta = {
  title: "HTML|CSS/Description",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const exampleTemplate = (exampleData: ReturnType<typeof descriptionExample>) =>
  html`${exampleData.map((d) => (typeof d === "string" ? d : descriptionTemplate(d)))}`;

export const Term: DescriptionStory = {
  args: termContent,
  argTypes: descriptionArgTypes,
  render: (args: DescriptionArgs) => descriptionTemplate(descriptionArgsMapper(args)),
};

export const Example: DescriptionExampleStory = {
  args: {
    openTerm: false,
  },
  argTypes: descriptionExampleArgTypes,
  render: (args: DescriptionExampleArgs) => exampleTemplate(descriptionExample(args.openTerm)),
};
