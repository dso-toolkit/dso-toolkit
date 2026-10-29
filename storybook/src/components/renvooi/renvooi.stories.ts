import { Meta, StoryObj } from "@storybook/web-components-vite";

import { RenvooiArgs, renvooiArgTypes, renvooiArgs, renvooiArgsMapper } from "./renvooi.args.js";
import { renvooiTemplate } from "./renvooi.template.js";

type RenvooiStory = StoryObj<RenvooiArgs>;

const meta: Meta<RenvooiArgs> = {
  title: "Core/Renvooi",
  tags: ["!autodocs"],
  argTypes: renvooiArgTypes,
  args: renvooiArgs,
};

export default meta;

export const Default: RenvooiStory = {
  render: (args) => renvooiTemplate(renvooiArgsMapper(args)),
};
