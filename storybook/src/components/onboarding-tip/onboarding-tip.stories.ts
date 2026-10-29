import { Meta, StoryObj } from "@storybook/web-components-vite";
import { fn } from "storybook/test";
import { v4 as uuidv4 } from "uuid";

import { OnboardingTipArgs, onboardingTipArgTypes, onboardingTipArgsMapper } from "./onboarding-tip.args.js";
import { headingContent, richContent } from "./onboarding-tip.content.js";
import { decorator } from "./onboarding-tip.decorator.js";
import { onboardingTipTemplate } from "./onboarding-tip.template.js";

type OnboardingTipStory = StoryObj<OnboardingTipArgs>;

const meta: Meta<OnboardingTipArgs> = {
  title: "Core/Onboarding Tip",
  tags: ["!autodocs"],
  argTypes: onboardingTipArgTypes,
  decorators: [decorator],
};

export default meta;

export const Default: OnboardingTipStory = {
  args: {
    id: uuidv4(),
    placement: "right",
    box: 2,
    dsoClose: fn(),
  },
  render: (args) => onboardingTipTemplate(onboardingTipArgsMapper(args, headingContent(), richContent())),
};
