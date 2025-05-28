import type { Meta } from "@storybook/web-components";
import { ApplicationHeadingArgs, applicationHeadingMeta, applicationHeadingStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/application-heading/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<ApplicationHeadingArgs> = {
  ...applicationHeadingMeta({ readme }),
  title: "HTML|CSS/Application Heading",
};

export default meta;

const { Default, WithSubtitle, WithSubtitleAndSteps, SubtitleOnly, SubtitleAndStepsOnly } = applicationHeadingStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { applicationHeadingTemplate } = templates;

    return {
      applicationHeadingTemplate,
    };
  },
});

export { Default, SubtitleAndStepsOnly, SubtitleOnly, WithSubtitle, WithSubtitleAndSteps };
