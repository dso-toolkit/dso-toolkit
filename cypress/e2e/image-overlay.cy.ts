describe("Image Overlay", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-image-overlay--image-overlay");
    cy.injectAxe();

    cy.get("dso-image-overlay").shadow().find("button.open").as("open-button");

    cy.checkA11y("dso-image-overlay");
  });

  afterEach(() => {
    cy.checkA11y("dso-image-overlay");
  });

  it("should forward focus to button", () => {
    cy.get("dso-image-overlay").should("have.attr", "tabindex", "0").click();

    cy.get("dso-image-overlay").shadow().find("button.open").should("have.focus");

    cy.get("dso-image-overlay").should("have.attr", "tabindex", "-1");
  });

  it("should show open button on hover", () => {
    cy.get("@open-button").should("not.be.visible");
    cy.get("dso-image-overlay").realHover();
    cy.checkA11y("dso-image-overlay");
    cy.get("@open-button").should("be.visible");
  });

  it("should show open button on focus", () => {
    cy.get("dso-image-overlay").realPress("Tab");
    cy.get("@open-button").should("be.visible");
  });

  it("should open and close overlay", () => {
    openOverlay();
    cy.get("dso-image-overlay").shadow().find("button.close").click();
    cy.get("dso-image-overlay").shadow().find(".wrapper > img").should("not.exist");
  });

  it("should close overlay on escape", () => {
    openOverlay();
    cy.realPress("Escape");
    cy.get("dso-image-overlay").shadow().find(".wrapper > img").should("not.exist");
  });

  it("should close overlay on click outside", () => {
    openOverlay();
    cy.get("body").realClick({ y: 50, x: 50 });
    cy.get("dso-image-overlay").shadow().find(".wrapper > img").should("not.exist");
  });

  it("should only have overlay available if image is zoomable", () => {
    cy.get("dso-image-overlay")
      .find("img")
      .invoke("attr", "src", "images/houtkachel-of-open-haard-infographic.jpg")
      .invoke("attr", "width", 400)
      .get("@open-button")
      .should("exist")
      .get("dso-image-overlay")
      .find("img")
      .invoke("removeAttr", "width") // Image natural width is 720px;
      .wait(100)
      .get("@open-button")
      .should("not.exist")
      .wait(100)
      .viewport(500, 750)
      .get("dso-image-overlay")
      .find("img")
      .invoke("attr", "style", "max-width: 100%;")
      .get("@open-button")
      .should("exist");
  });

  it("should have a title and a caption", () => {
    openOverlay();

    cy.get("dso-image-overlay")
      .find('div[slot = "titel"] span')
      .should("have.text", "Afbeelding 1")
      .and("be.visible")
      .get("dso-image-overlay")
      .find('div[slot = "bijschrift"] span')
      .should("have.text", "Bijschrift bij afbeelding")
      .and("be.visible");
  });
});

function openOverlay() {
  cy.get("@open-button").click();
  cy.get("dso-image-overlay").shadow().find(".wrapper > img").should("be.visible");
}
