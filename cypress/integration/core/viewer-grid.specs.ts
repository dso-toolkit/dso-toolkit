describe("Viewer Grid", () => {
  const url = "http://localhost:56106/iframe.html?id=viewer-grid--viewer-grid";
  const urlOverlayClosed = `${url}&args=overlayOpen:false`;
  const urlOverlayOpened = `${url}&args=overlayOpen:true`;
  const urlNoOverlay = `${urlOverlayOpened}&args=noOverlay:true`;

  it("should not show close button", () => {
    cy.visit(urlOverlayClosed);
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".overlay-close-button")
      .should("not.be.visible");
  });

  it("should show close button", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".overlay-close-button")
      .should("be.visible");
  });

  it("should not show overlay", () => {
    cy.visit(urlOverlayClosed);
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".overlay")
      .should("not.be.visible");
  });

  it("should show overlay", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").shadow().find(".overlay").should("be.visible");
  });

  it("should emit closeOverlay", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").then((c) => {
      c.get(0).addEventListener("closeOverlay", cy.stub().as("closeOverlay"));
    });
    cy.get("dso-viewer-grid").shadow().find(".overlay-close-button").click();
    cy.get("@closeOverlay").should("have.been.calledOnce");
  });

  it("should open large", () => {
    cy.visit(url);
    cy.get("dso-viewer-grid").should("have.attr", "large");
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".shrink")
      .should("not.be.disabled");
    cy.get("dso-viewer-grid").shadow().find(".expand").should("be.disabled");
  });

  it("should switch to medium", () => {
    cy.visit(url);
    cy.get("dso-viewer-grid").shadow().find(".shrink").click();
    cy.get("dso-viewer-grid").should("have.attr", "medium");
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".shrink")
      .should("not.be.disabled");
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".expand")
      .should("not.be.disabled");
  });

  it("should switch to small", () => {
    cy.visit(url);
    cy.get("dso-viewer-grid").shadow().find(".shrink").click().click();
    cy.get("dso-viewer-grid").should("have.attr", "small");
    cy.get("dso-viewer-grid").shadow().find(".shrink").should("be.disabled");
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".expand")
      .should("not.be.disabled");
  });

  it("should focus close button on overlay open", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".overlay-close-button")
      .should("be.focused");
  });

  it("should emit closeOverlay on escape", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").then((c) => {
      c.get(0).addEventListener("closeOverlay", cy.stub().as("closeOverlay"));
    });
    cy.wait(100);
    cy.realPress("Escape");
    cy.get("@closeOverlay").should("have.been.calledOnce");
  });

  it("should trap focus on overlay open", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".overlay-close-button")
      .should("be.focused")
      .realPress("Tab");
    cy.get("dso-viewer-grid")
      .find("div[slot = 'overlay'] a[href]")
      .eq(0)
      .should("be.focused")
      .realPress("Tab");
    cy.get("dso-viewer-grid")
      .find("div[slot = 'overlay'] a[href]")
      .eq(1)
      .should("be.focused")
      .realPress("Tab");
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".overlay-close-button")
      .should("be.focused");
  });

  it("should not show overlay", () => {
    cy.visit(urlNoOverlay);
    cy.get("dso-viewer-grid")
      .shadow()
      .find(".overlay")
      .should("not.be.visible");
  });
});
