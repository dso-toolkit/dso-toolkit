import { OnboardingTip } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreOnboardingTip: ComponentImplementation<OnboardingTip<TemplateResult>> = {
  component: "onboardingTip",
  implementation: "core",
  template: () =>
    function onboardingTipTemplate({ placement, id, dsoClose, content, heading }) {
      return html`<dso-onboarding-tip id=${ifDefined(id)} placement=${placement} @dsoClose=${dsoClose}>
        ${heading} ${content}
      </dso-onboarding-tip>`;
    },
};
