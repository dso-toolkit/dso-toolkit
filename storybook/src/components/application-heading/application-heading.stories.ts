import { Meta, StoryObj } from "@storybook/web-components-vite";

import {
  ApplicationHeadingArgs,
  applicationHeadingArgTypes,
  applicationHeadingArgsMapper,
} from "./application-heading.args.js";
import { applicationHeadingTemplate } from "./application-heading.template.js";

type ApplicationHeadingStory = StoryObj<ApplicationHeadingArgs>;

const meta: Meta<ApplicationHeadingArgs> = {
  title: "HTML|CSS/Application Heading",
  tags: ["!autodocs"],
  argTypes: applicationHeadingArgTypes,

  render: (args) => applicationHeadingTemplate(applicationHeadingArgsMapper(args)),
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
