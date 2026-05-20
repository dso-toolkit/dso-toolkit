describe("Banner", () => {
  const statuses: Array<{
    storyId: string;
    status: string;
    text: string;
  }> = [
    { storyId: "core-banner--success", status: "success", text: "Gelukt!" },
    { storyId: "core-banner--error", status: "error", text: "Storingsmelding:" },
    { storyId: "core-banner--info", status: "info", text: "Een informatieve banner" },
    { storyId: "core-banner--warning", status: "warning", text: "Onderhoudsmelding:" },
  ];

  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-banner--error");
    cy.get("dso-banner.hydrated", { timeout: 10000 }).should("exist");
  });

  it("should render the error banner story", () => {
    cy.get("dso-banner.hydrated")
      .as("dsoBanner")
      .should("be.visible")
      .and("have.attr", "status", "error")
      .and("have.attr", "icon");

    cy.get("@dsoBanner").shadow().as("dsoBannerShadow").find(".dso-banner.alert-error").should("be.visible");

    cy.get("@dsoBannerShadow").find(".dso-banner").should("be.visible");
    cy.get("@dsoBanner").find(".dso-rich-content").should("contain.text", "Storingsmelding:");
    cy.get("@dsoBanner").find("dso-icon-button").should("have.length", 1);
    cy.get("@dsoBanner").matchImageSnapshot();
  });

  for (const { storyId, status, text } of statuses) {
    it(`should render status "${status}" correctly`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=${storyId}`);

      cy.get("dso-banner.hydrated").as("dsoBanner").should("have.attr", "status", status);

      cy.get("@dsoBanner").shadow().as("dsoBannerShadow");

      cy.get("@dsoBannerShadow").find(`.dso-banner.alert-${status}`).should("be.visible");
      cy.get("@dsoBanner").find(".dso-rich-content").should("contain.text", text);
      cy.get("@dsoBanner").matchImageSnapshot(`banner-${status}`);
    });

    it(`should be accessible for status "${status}"`, () => {
      cy.visit(`http://localhost:45000/iframe.html?id=${storyId}`)
        .get("dso-banner.hydrated", { timeout: 10000 })
        .should("exist");

      cy.injectAxe();
      cy.dsoCheckA11y("dso-banner.hydrated");
    });
  }

  it("should render compact non-removable variant without icon", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-banner--info-compact-non-removable")
      .get("dso-banner.hydrated")
      .as("dsoBanner")
      .get("@dsoBanner")
      .should("have.attr", "status", "info")
      .should("have.attr", "compact")
      .get("@dsoBanner")
      .should("not.have.attr", "icon")
      .get("@dsoBanner")
      .shadow()
      .as("dsoBannerShadow")
      .find(".dso-banner.dso-compact")
      .should("be.visible")
      .get("@dsoBanner")
      .find("dso-icon-button")
      .should("not.exist")
      .get("@dsoBanner")
      .matchImageSnapshot("banner-info-compact-non-removable");
  });
});
