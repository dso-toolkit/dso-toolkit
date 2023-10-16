import type { Meta } from "@storybook/web-components";
import { ApplicationHeadingArgs, applicationHeadingMeta, applicationHeadingStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/application-heading/readme.md?raw";

const meta: Meta<ApplicationHeadingArgs> = {
  ...applicationHeadingMeta({ readme }),
  component: "dso-application-heading",
  title: "Application Heading",
};

export default meta;

const { Default, WithSubtitel, WithSubtitelAndSteps, SubtitleOnly, SubtitleAndStepsOnly } = applicationHeadingStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { applicationHeadingTemplate } = templates;

    return {
      applicationHeadingTemplate,
    };
  },
});

export { Default, WithSubtitel, WithSubtitelAndSteps, SubtitleOnly, SubtitleAndStepsOnly };
