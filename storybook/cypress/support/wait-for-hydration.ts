export function waitForHydration() {
  cy.document().then((doc) => {
    const hasDsoComponents = Array.from(doc.querySelectorAll("*")).some((el) => el.tagName.startsWith("DSO-"));

    if (hasDsoComponents) {
      cy.get("*")
        .filter((_, el) => el.tagName.startsWith("DSO-"))
        .should("have.class", "hydrated");
    }
  });
}
