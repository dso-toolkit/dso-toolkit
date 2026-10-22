describe("Image Overlay", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-image-overlay--image-overlay");
    cy.injectAxe();

    cy.get("dso-image-overlay").shadow().find("dso-icon-button.open.hydrated").as("open-button");

    cy.dsoCheckA11y("dso-image-overlay.hydrated");
  });

  afterEach(() => {
    cy.dsoCheckA11y("dso-image-overlay.hydrated");
  });

  it("should forward focus to button", () => {
    cy.get("@open-button").shadow().find("button").should("not.have.focus");

    cy.get("dso-image-overlay").click();
    cy.get("@open-button").shadow().find("button").should("have.focus");
  });

  it("should show open button on hover", () => {
    cy.get("@open-button").should("not.be.visible");
    cy.get("dso-image-overlay").realHover();
    cy.dsoCheckA11y("dso-image-overlay.hydrated");
    cy.get("@open-button").should("be.visible");
  });

  it("should show open button on focus", () => {
    cy.get("dso-image-overlay").realPress("Tab");
    cy.get("@open-button").should("be.visible");
  });

  it("should open and close overlay", () => {
    openOverlay();

    // Take the entire page, otherwise the enlargement of the image will not be snapshotted
    cy.matchImageSnapshot();

    cy.get("dso-image-overlay").shadow().find("dso-icon-button.close.hydrated").click();
    cy.get("dso-image-overlay").shadow().find(".wrapper").should("not.exist");
  });

  it("should keep the caption within the viewport when the viewport is short", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-image-overlay--image-overlay&args=image:2");
    cy.injectAxe();
    cy.viewport(1000, 400);

    cy.get("dso-image-overlay").shadow().find("dso-icon-button.open.hydrated").as("open-button");
    openOverlay();

    cy.get("dso-image-overlay")
      .shadow()
      .find(".figuur-bijschrift")
      .should(($caption) => {
        const caption = $caption[0]!;
        const { top, bottom } = caption.getBoundingClientRect();

        expect(top).to.be.at.least(0);
        expect(bottom).to.be.at.most(caption.ownerDocument.defaultView!.innerHeight);
      });
  });

  it("should close overlay on escape", () => {
    openOverlay();
    cy.realPress("Escape");
    cy.get("dso-image-overlay").shadow().find(".wrapper").should("not.exist");
  });

  it("should close overlay on click outside", () => {
    openOverlay();

    cy.get("body").realClick({ y: 50, x: 50 });
    cy.get("dso-image-overlay").shadow().find(".wrapper").should("not.exist");
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
      .and("be.visible")
      .and("have.css", "font-size", "14px");

    cy.get("dso-image-overlay")
      .shadow()
      .find(".wrapper")
      .should(($wrapper) => {
        const titleBottom = $wrapper.find(".title")[0]!.getBoundingClientRect().bottom;
        const imageTop = $wrapper.find(".content > img")[0]!.getBoundingClientRect().top;

        expect(titleBottom).to.be.at.most(imageTop);
      });
  });

  it("should render a custom title", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-image-overlay--image-overlay&args=title:Eigen%20titel");
    cy.injectAxe();

    cy.get("dso-image-overlay").find('div[slot="titel"] span').should("have.text", "Eigen titel");
  });

  it("should support STOP titles with multiple elements", () => {
    cy.get('dso-image-overlay div[slot="titel"]').then(($titleSlot) => {
      const titleSlot = $titleSlot[0]!;
      const doc = titleSlot.ownerDocument;

      const firstLine = doc.createElement("span");
      firstLine.textContent = "Wonen, werken en bereikbaarheid";

      const secondLine = doc.createElement("span");
      secondLine.textContent = "Strategie: VISTA";

      titleSlot.replaceChildren(firstLine, doc.createElement("br"), secondLine);
    });

    openOverlay();

    cy.get('dso-image-overlay div[slot="titel"] span').should(($lines) => {
      expect($lines).to.have.length(2);
      expect($lines[1]!.getBoundingClientRect().top).to.be.at.least($lines[0]!.getBoundingClientRect().bottom);
    });
  });
});

function openOverlay() {
  cy.get("@open-button").click();
  cy.get("dso-image-overlay").shadow().find(".wrapper .content > img").should("be.visible");
}
