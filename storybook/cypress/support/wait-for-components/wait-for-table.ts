import { WaitForComponent } from "./wait-for-component.interface";

export class WaitForTable implements WaitForComponent<HTMLDsoTableElement> {
  is(element: HTMLElement): element is HTMLDsoTableElement {
    return element.tagName === "DSO-TABLE";
  }

  wait(table: HTMLDsoTableElement) {
    cy.wrap(table).should("have.attr", "is-responsive");
  }
}
