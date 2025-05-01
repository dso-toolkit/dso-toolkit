export const onboardingTipPlacements = ["top", "right", "bottom", "left"] as const;

export interface OnboardingTip<TemplateFnReturnType> {
  active?: boolean;
  id: string;
  placement: (typeof onboardingTipPlacements)[number];
  heading?: TemplateFnReturnType;
  content?: TemplateFnReturnType;
  dsoClose?: (e: CustomEvent<OnboardingTipCloseEvent>) => void;
}

export interface OnboardingTipCloseEvent {
  originalEvent?: MouseEvent | Event;
}
