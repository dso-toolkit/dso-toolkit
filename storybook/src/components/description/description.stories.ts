import { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit-html";

import {
  DescriptionArgs,
  DescriptionExampleArgs,
  descriptionArgTypes,
  descriptionArgsMapper,
  descriptionExampleArgTypes,
} from "./description.args.js";
import { descriptionExample, termContent } from "./description.content.js";
import { descriptionTemplate } from "./description.template.js";

type DescriptionStory = StoryObj<DescriptionArgs>;
type DescriptionExampleStory = StoryObj<DescriptionExampleArgs>;

const meta: Meta = {
  title: "HTML|CSS/Description",
  tags: ["!autodocs"],
};

export default meta;

const exampleTemplate = (exampleData: ReturnType<typeof descriptionExample>) =>
  html`${exampleData.map((d) => (typeof d === "string" ? d : descriptionTemplate(d)))}`;

export const Term: DescriptionStory = {
  args: termContent(),
  argTypes: descriptionArgTypes,
  render: (args) => descriptionTemplate(descriptionArgsMapper(args)),
};

export const Example: DescriptionExampleStory = {
  args: {
    openTerm: false,
  },
  argTypes: descriptionExampleArgTypes,
  render: (args) => exampleTemplate(descriptionExample(args.openTerm)),
};
