import { ArgTypes } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";
import { noControl } from "../../shared/no-control.js";

import { OnboardingTip, onboardingTipPlacements } from "./onboarding-tip.models.js";

export interface OnboardingTipArgs {
  id: string;
  box: number | undefined;
  placement: (typeof onboardingTipPlacements)[number];
  dsoClose: HandlerFunction;
}

export const onboardingTipArgTypes: ArgTypes<OnboardingTipArgs> = {
  id: noControl(),
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
  dsoClose: argTypeAction(),
};

export function onboardingTipArgsMapper(
  a: OnboardingTipArgs,
  heading?: TemplateResult | string,
  content?: TemplateResult | string,
): OnboardingTip {
  return {
    id: a.id,
    placement: a.placement,
    dsoClose: (e) => a.dsoClose(e.detail),
    content,
    heading,
  };
}
