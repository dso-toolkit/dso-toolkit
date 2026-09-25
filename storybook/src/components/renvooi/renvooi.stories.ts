import readme from "@dso-toolkit/core/src/components/renvooi/readme.md?raw";
import { Meta, StoryObj } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";

import { RenvooiArgs, renvooiArgTypes, renvooiArgs, renvooiArgsMapper } from "./renvooi.args.js";
import { renvooiTemplate } from "./renvooi.template.js";

type RenvooiStory = StoryObj<RenvooiArgs>;

const meta: Meta<RenvooiArgs> = {
  title: "Core/Renvooi",
  argTypes: renvooiArgTypes,
  args: renvooiArgs,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: RenvooiStory = {
  render: (args) => renvooiTemplate(renvooiArgsMapper(args)),
};
