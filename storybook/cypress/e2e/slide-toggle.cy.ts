import { v4 as uuidv4 } from "uuid";

describe("Slide Toggle", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-slide-toggle--default")
      .get("dso-slide-toggle")
      .then(($slideToggle) => {
        $slideToggle.on("dsoActiveChange", cy.stub().as("dsoActiveChangeListener"));
      });
  });

  it("should render the slide-button states correctly", () => {
    cy.percySnapshot(`${Cypress.currentTest.title}" -- off`);
    cy.injectAxe();
    cy.checkA11y("dso-slide-toggle");

    cy.get("dso-slide-toggle")
      .shadow()
      .find('button[role="switch"]')
      .should("have.attr", "aria-checked", "false")
      .get("dso-slide-toggle")
      .invoke("attr", "checked", true)
      .shadow()
      .find('button[role="switch"]')
      .should("have.attr", "aria-checked", "true")
      .wait(400);

    cy.percySnapshot(`${Cypress.currentTest.title}" -- on`);

    cy.get("dso-slide-toggle")
      .invoke("attr", "disabled", true)
      .shadow()
      .find('button[role="switch"]')
      .should("have.attr", "disabled")
      .wait(400);

    cy.percySnapshot(`${Cypress.currentTest.title}" -- disabled`);
  });

  it("should correctly set aria-label", () => {
    cy.get("dso-slide-toggle")
      .invoke("attr", "accessible-label", "slide label")
      .shadow()
      .find('button[role="switch"]')
      .should("have.attr", "aria-label", "slide label");
  });

  it("should correctly set aria-labelledby", () => {
    const id = uuidv4();

    cy.get("dso-slide-toggle")
      .invoke("removeAttr", "accessible-label")
      .invoke("attr", "labelledby-id", id)
      .shadow()
      .find('button[role="switch"]')
      .should("have.attr", "aria-labelledby", id);
  });

  it("should emit event when clicked", () => {
    cy.get("dso-slide-toggle")
      .shadow()
      .find('button[role="switch"]')
      .should("have.attr", "aria-checked", "false")
      .realClick()
      .get("dso-slide-toggle")
      .shadow()
      .find('button[role="switch"]')
      .should("have.attr", "aria-checked", "true")
      .get("@dsoActiveChangeListener")
      .should("have.been.calledOnce")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.checked")
      .should("equal", true);
  });
});
