import { OnboardingTip } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ComponentImplementation } from "../../templates";
import { ifDefined } from "lit-html/directives/if-defined.js";

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
