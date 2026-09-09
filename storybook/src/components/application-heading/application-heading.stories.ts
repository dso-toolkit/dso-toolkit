import { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/application-heading/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import {
  ApplicationHeadingArgs,
  applicationHeadingArgTypes,
  applicationHeadingArgsMapper,
} from "./application-heading.args.js";
import { applicationHeadingTemplate } from "./application-heading.template.js";

type ApplicationHeadingStory = StoryObj<ApplicationHeadingArgs, Renderer>;

const meta: Meta<ApplicationHeadingArgs> = {
  title: "HTML|CSS/Application Heading",
  argTypes: applicationHeadingArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const render = (args: ApplicationHeadingArgs) => applicationHeadingTemplate(applicationHeadingArgsMapper(args));

export const Default: ApplicationHeadingStory = {
  args: {
    title: "H1 Paginatitel",
  },
  render,
};

export const WithSubtitle: ApplicationHeadingStory = {
  args: {
    title: "H1 Paginatitel",
    subtitle: "H2 Subtitel",
  },
  render,
};

export const WithSubtitleAndSteps: ApplicationHeadingStory = {
  args: {
    title: "H1 Paginatitel",
    subtitle: "H2 Subtitel",
    step: "Stap x van x",
  },
  render,
};

export const SubtitleOnly: ApplicationHeadingStory = {
  args: {
    subtitle: "H2 Subtitel",
  },
  render,
};

export const SubtitleAndStepsOnly: ApplicationHeadingStory = {
  args: {
    subtitle: "H2 Subtitel",
    step: "Stap x van x",
  },
  render,
};
