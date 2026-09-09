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
  render: (args: ApplicationHeadingArgs) => applicationHeadingTemplate(applicationHeadingArgsMapper(args)),
};

export default meta;

export const Default: ApplicationHeadingStory = {
  args: {
    title: "H1 Paginatitel",
  },
};

export const WithSubtitle: ApplicationHeadingStory = {
  args: {
    title: "H1 Paginatitel",
    subtitle: "H2 Subtitel",
  },
};

export const WithSubtitleAndSteps: ApplicationHeadingStory = {
  args: {
    title: "H1 Paginatitel",
    subtitle: "H2 Subtitel",
    step: "Stap x van x",
  },
};

export const SubtitleOnly: ApplicationHeadingStory = {
  args: {
    subtitle: "H2 Subtitel",
  },
};

export const SubtitleAndStepsOnly: ApplicationHeadingStory = {
  args: {
    subtitle: "H2 Subtitel",
    step: "Stap x van x",
  },
};
