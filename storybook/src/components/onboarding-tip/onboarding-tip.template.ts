import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { OnboardingTip } from "./onboarding-tip.models.js";

export function onboardingTipTemplate({ placement, id, dsoClose, content, heading }: OnboardingTip<TemplateResult>) {
  return html`<dso-onboarding-tip id=${ifDefined(id)} placement=${placement} @dsoClose=${dsoClose}>
    ${heading} ${content}
  </dso-onboarding-tip>`;
}
