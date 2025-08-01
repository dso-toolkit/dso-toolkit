import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

import { OnboardingTip, onboardingTipPlacements } from "./onboarding-tip.models";

export interface OnboardingTipArgs {
  id: string;
  box: number | undefined;
  placement: (typeof onboardingTipPlacements)[number];
  dsoClose: HandlerFunction;
}

export const onboardingTipArgTypes: ArgTypes<OnboardingTipArgs> = {
  id: {
    ...noControl,
  },
  placement: {
    options: onboardingTipPlacements,
    control: {
      type: "select",
    },
  },
  box: {
    options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    control: {
      type: "select",
    },
  },
  dsoClose: {
    ...noControl,
  },
};

export function onboardingTipArgsMapper<TemplateFnReturnType>(
  a: OnboardingTipArgs,
  heading?: TemplateFnReturnType,
  content?: TemplateFnReturnType,
): OnboardingTip<TemplateFnReturnType> {
  return {
    id: a.id,
    placement: a.placement,
    dsoClose: a.dsoClose,
    content,
    heading,
  };
}
