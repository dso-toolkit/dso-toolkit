import { WaitForAccordion } from "./wait-for-accordion";
import { WaitForComponent } from "./wait-for-component.interface";
import { WaitForHeader } from "./wait-for-header";
import { WaitForOnboardingTip } from "./wait-for-onboarding-tip";
import { WaitForTable } from "./wait-for-table";

const waitableComponents: WaitForComponent<HTMLElement>[] = [
  new WaitForAccordion(),
  new WaitForHeader(),
  new WaitForOnboardingTip(),
  new WaitForTable(),
];

export function waitForComponents() {
  cy.get("body")
    .should("have.class", "sb-show-main")
    .get("#root-inner")
    .should("exist")
    .and("be.visible")
    .document()
    .then((doc) => {
      const dsoComponents = Array.from(doc.querySelectorAll("*")).filter((el) => el.tagName.startsWith("DSO-"));

      if (dsoComponents.length > 0) {
        cy.log(prettyPrintResults(dsoComponents));
        cy.get("*")
          .filter((_, el) => el.tagName.startsWith("DSO-"))
          .should("have.class", "hydrated")
          .then(($components) => {
            $components.each((_, el) => {
              waitableComponents.find((c) => c.is(el))?.wait(el);
            });
          });
      }
    });

  // Wacht tot alle (async ge-preloade) webfonts geladen zijn. De cursieve Asap-variant
  // wordt gebruikt in de disclaimer boven de footer; als die pas na de snapshot laadt,
  // verschuift de footer verticaal en ontstaat er een diff.
  cy.document().then((doc) => doc.fonts.ready);
  cy.document().its("fonts.status").should("equal", "loaded");
}

function prettyPrintResults(dsoComponents: Element[]) {
  const results = dsoComponents.reduce<Record<string, number>>((acc, element) => {
    const tagName = element.tagName.toLowerCase();
    acc[tagName] = (acc[tagName] || 0) + 1;

    return acc;
  }, {});

  return `DSO components found: ${JSON.stringify(results)}`;
}
