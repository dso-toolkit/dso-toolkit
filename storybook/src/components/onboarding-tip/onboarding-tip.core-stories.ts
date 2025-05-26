import readme from "@dso-toolkit/core/src/components/onboarding-tip/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { OnboardingTipArgs, onboardingTipMeta, onboardingTipStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { headingContent, richContent } from "./onboarding-tip.content";
import { decorator } from "./onboarding-tip.decorator";

const meta: Meta<OnboardingTipArgs> = {
  ...onboardingTipMeta({ readme }),
  title: "Core/Onboarding Tip",
};

export default meta;

const { Default } = onboardingTipStories(
  {
    templateContainer,
    storyTemplates: (templates) => {
      const { onboardingTipTemplate } = templates;

      return {
        onboardingTipTemplate,
        richContent: richContent(templates),
        headingContent: headingContent(templates),
      };
    },
  },
  decorator,
);

export { Default };
