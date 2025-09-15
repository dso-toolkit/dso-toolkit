import { WaitForComponent } from "./wait-for-component.interface";

export class WaitForHeader implements WaitForComponent<HTMLDsoHeaderElement> {
  is(element: HTMLElement): element is HTMLDsoHeaderElement {
    return element.tagName === "DSO-HEADER";
  }

  wait(header: HTMLDsoHeaderElement) {
    if (!header.hasAttribute("is-compact")) {
      cy.wrap(header)
        .shadow()
        .find(".dso-nav-main")
        .should((s) => expect(s).to.have.class("ready"));
    }
  }
}
