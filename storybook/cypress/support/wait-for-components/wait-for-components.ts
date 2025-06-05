import { WaitForAccordion } from "./wait-for-accordion";
import { WaitForComponent } from "./wait-for-component.interface";
import { WaitForTable } from "./wait-for-table";

const waitableComponents: WaitForComponent<HTMLElement>[] = [new WaitForAccordion(), new WaitForTable()];

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
}

function prettyPrintResults(dsoComponents: Element[]) {
  const results = dsoComponents.reduce<Record<string, number>>((acc, element) => {
    const tagName = element.tagName.toLowerCase();
    acc[tagName] = (acc[tagName] || 0) + 1;

    return acc;
  }, {});

  return `DSO components found: ${JSON.stringify(results)}`;
}
