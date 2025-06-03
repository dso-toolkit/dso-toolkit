import { WaitForComponent } from "./wait-for-component.interface";

export class WaitForAccordion implements WaitForComponent<HTMLDsoAccordionElement> {
  is(element: HTMLElement): element is HTMLDsoAccordionElement {
    return element.tagName === "DSO-ACCORDION";
  }

  wait(accordion: HTMLDsoAccordionElement) {
    let variant: string;

    cy.wrap(accordion)
      .invoke("prop", "variant")
      .then((v) => {
        variant = v;
      });

    cy.wrap(accordion)
      .find("dso-accordion-section")
      .should((s) => expect(s).to.have.class(`dso-accordion-${variant}`));
  }
}
