export function waitForHydration() {
  cy.document().then((doc) => {
    const hasDsoComponents = Array.from(doc.querySelectorAll("*")).some((el) => el.tagName.startsWith("DSO-"));

    if (hasDsoComponents) {
      cy.get("*")
        .filter((_, el) => el.tagName.startsWith("DSO-"))
        .should("have.class", "hydrated")
        .then(($components) => {
          $components.each((_, el) => {
            if (el.tagName === "DSO-ACCORDION") {
              let variant: string;

              cy.wrap(el)
                .invoke("prop", "variant")
                .then((v) => {
                  variant = v;
                });

              cy.wrap(el)
                .find("dso-accordion-section")
                .should((s) => expect(s).to.have.class(`dso-accordion-${variant}`));
            } else if (el.tagName === "DSO-TABLE") {
              cy.wrap(el).should("have.attr", "is-responsive");
            }
          });
        });
    }
  });
}
