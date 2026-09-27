import { TemplateResult } from "lit-html";

export const onboardingTipPlacements = ["top", "right", "bottom", "left"] as const;

export interface OnboardingTip {
  id: string;
  placement: (typeof onboardingTipPlacements)[number];
  heading?: TemplateResult | string;
  content?: TemplateResult | string;
  dsoClose?: (e: CustomEvent<OnboardingTipCloseEvent>) => void;
}

export interface OnboardingTipCloseEvent {
  originalEvent?: MouseEvent | Event;
}
