import type { Meta } from "@storybook/web-components";
import { applicationHeadingArgTypes, applicationHeadingStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
  component: "dso-application-heading",
  title: "HTML|CSS/Application Heading",
  argTypes: applicationHeadingArgTypes,
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
