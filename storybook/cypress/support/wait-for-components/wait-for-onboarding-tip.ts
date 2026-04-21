import { WaitForComponent } from "./wait-for-component.interface";

export class WaitForOnboardingTip implements WaitForComponent<HTMLDsoOnboardingTipElement> {
  is(element: HTMLElement): element is HTMLDsoOnboardingTipElement {
    return element.tagName === "DSO-ONBOARDING-TIP";
  }

  wait(onboardingTip: HTMLDsoOnboardingTipElement) {
    const selector = onboardingTip.id ? `dso-onboarding-tip#${onboardingTip.id}` : "dso-onboarding-tip";

    cy.get(selector).should(($onboardingTip) => {
      const element = $onboardingTip[0];
      const { visibility, opacity } = element.style;

      expect(visibility).to.equal("visible");
      expect(opacity).to.equal("1");
    });
  }
}
