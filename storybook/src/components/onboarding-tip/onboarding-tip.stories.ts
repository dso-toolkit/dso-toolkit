import readme from "@dso-toolkit/core/src/components/onboarding-tip/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { StoryObj } from "../../shared/story-obj.js";

import { OnboardingTipArgs, onboardingTipArgTypes, onboardingTipArgsMapper } from "./onboarding-tip.args.js";
import { headingContent, richContent } from "./onboarding-tip.content.js";
import { decorator } from "./onboarding-tip.decorator";
import { onboardingTipTemplate } from "./onboarding-tip.template.js";

type OnboardingTipStory = StoryObj<OnboardingTipArgs, Renderer>;

const meta: Meta<OnboardingTipArgs> = {
  title: "Core/Onboarding Tip",
  argTypes: onboardingTipArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Default: OnboardingTipStory = {
  args: {
    id: uuidv4(),
    placement: "right",
    box: 2,
    dsoClose: fn(),
  },
  decorators: [(story, context) => decorator(story, context.args)],
  render: (args) => onboardingTipTemplate(onboardingTipArgsMapper(args, headingContent(), richContent())),
};
