import readme from "@dso-toolkit/core/src/components/renvooi/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { RenvooiArgs, renvooiArgTypes, renvooiArgs, renvooiArgsMapper } from "./renvooi.args.js";
import { renvooiTemplate } from "./renvooi.template.js";

type RenvooiStory = StoryObj<RenvooiArgs, Renderer>;

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
