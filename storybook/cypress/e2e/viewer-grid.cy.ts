const url = "http://localhost:45000/iframe.html?id=core-viewer-grid--viewer-grid";
const urlOverlayClosed = `${url}&args=overlayOpen:false`;
const urlOverlayOpened = `${url}&args=overlayOpen:true`;

describe("Viewer Grid", () => {
  // ToDo: Fix the 'matches snapshots -- filter-panel-open - small viewport` in #3199
  it.skip("matches snapshots", () => {
    cy.visit(url);

    cy.get("dso-viewer-grid.hydrated")
      .as("viewer-grid")
      .invoke("attr", "main-size", "small")
      .invoke("attr", "main-panel-expanded", "")
      .invoke("attr", "document-panel-open", "")
      .invoke("attr", "document-panel-size", "small")
      .matchImageSnapshot();

    cy.get("@viewer-grid")
      .invoke("attr", "main-size", "medium")
      .invoke("attr", "main-panel-expanded", true)
      .invoke("attr", "document-panel-open", false)
      .invoke("attr", "filter-panel-title", "De titel van het filter paneel")
      .invoke("attr", "filter-panel-open", true)
      .wait(250)
      .matchImageSnapshot(`${Cypress.currentTest.title}" -- filter-panel-open - large viewport`);

    cy.viewport(900, 600)
      .wait(250)
      .get("@viewer-grid")
      .matchImageSnapshot(`${Cypress.currentTest.title}" -- filter-panel-open - medium viewport`);

    cy.viewport(800, 600)
      .get("@viewer-grid")
      .invoke("attr", "active-tab", "search")
      .wait(250)
      .matchImageSnapshot(`${Cypress.currentTest.title}" -- filter-panel-open - small viewport`);
  });

  it("should be accessible (overlay closed)", () => {
    cy.visit(urlOverlayClosed);
    cy.injectAxe();
    cy.dsoCheckA11y("dso-viewer-grid.hydrated");
  });

  it("should be accessible (overlay opened)", () => {
    cy.visit(urlOverlayOpened);
    cy.injectAxe();
    cy.dsoCheckA11y("dso-viewer-grid.hydrated");
  });

  it("should show the viewer grid", () => {
    cy.visit(url);

    cy.get("dso-viewer-grid.hydrated")
      .invoke("attr", "main-size", "small")
      .invoke("attr", "document-panel-size", "small")
      .invoke("attr", "document-panel-open", "")
      .then(($viewerGrid) => {
        $viewerGrid
          .on("dsoDocumentPanelSizeChange", cy.stub().as("dsoDocumentPanelSizeChange"))
          .on("dsoDocumentPanelSizeChangeAnimationEnd", cy.stub().as("dsoDocumentPanelSizeChangeAnimationEnd"))
          .on("dsoMainPanelToggle", cy.stub().as("dsoMainPanelToggle"));
      })
      .shadow()
      .as("viewerGrid")
      .find(".dso-document-panel")
      .should("exist")
      .get("dso-viewer-grid.hydrated")
      .invoke("attr", "main-panel-expanded", "")
      .get("@viewerGrid")
      .find(".dso-main-panel .toggle-button > dso-icon-button")
      .should("exist")
      .click()
      .get("@dsoMainPanelToggle")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.include", { hide: true })
      .get("dso-viewer-grid.hydrated")
      .invoke("attr", "main-panel-hidden", "")
      .get("@viewerGrid")
      .find(".dso-main-panel .content")
      .should("have.class", "invisible");
  });

  it("should not show overlay", () => {
    cy.visit(urlOverlayClosed);
    cy.get("dso-viewer-grid.hydrated").shadow().find(".overlay").should("exist").and("not.have.attr", "open");
    cy.get("dso-viewer-grid.hydrated").matchImageSnapshot();
  });

  it("should show overlay", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid.hydrated").shadow().find(".overlay").should("exist").and("have.attr", "open");
    cy.get("dso-viewer-grid.hydrated").matchImageSnapshot();
  });

  it("should emit closeOverlay", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid.hydrated").then((c) => {
      c.get(0).addEventListener("dsoCloseOverlay", cy.stub().as("closeOverlay"));
    });
    cy.get("dso-viewer-grid.hydrated").shadow().find(".overlay-close-button").first().click();
    cy.get("@closeOverlay").should("have.been.calledOnce");
  });

  it("should focus close button on overlay open", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid.hydrated").shadow().find(".overlay-close-button").should("be.focused");
  });

  it("should emit closeOverlay on escape", () => {
    cy.visit(url)
      .get("dso-viewer-grid.hydrated")
      .then((c) => {
        c.get(0).addEventListener("dsoCloseOverlay", cy.stub().as("closeOverlay"));
      })
      .invoke("attr", "overlay-open", "")
      .get("dso-viewer-grid.hydrated")
      .shadow()
      .find(".overlay:focus-within")
      .should("exist")
      .and("have.attr", "open")
      .realPress("Escape")
      .get("@closeOverlay")
      .should("have.been.calledOnce");
  });

  it("should toggle filter panel", () => {
    cy.visit(url);

    cy.get("dso-viewer-grid.hydrated").shadow().find(".filter-panel").should("be.not.visible");
    cy.get("dso-viewer-grid.hydrated").shadow().find(".filter-panel h3").should("not.exist");

    cy.get("dso-viewer-grid.hydrated")
      .invoke("attr", "filter-panel-title", "Titel van filterpaneel")
      .invoke("attr", "filter-panel-open", "")
      .shadow()
      .find(".filter-panel")
      .should("be.visible");

    cy.get("dso-viewer-grid.hydrated").shadow().find(".filter-panel h3").should("exist").and("be.visible");

    cy.get("dso-viewer-grid.hydrated")
      .invoke("attr", "filter-panel-open", null)
      .shadow()
      .find(".filter-panel")
      .should("be.not.visible");

    cy.get("dso-viewer-grid.hydrated").shadow().find(".filter-panel h3").should("not.exist");
  });

  it("shows the correct title for the filter panel", () => {
    cy.visit(url)
      .get("dso-viewer-grid.hydrated")
      .invoke("attr", "filter-panel-title", "Laten we gaan filteren")
      .invoke("attr", "filter-panel-open", "")
      .shadow()
      .find(".filter-panel h3")
      .should("have.text", "Laten we gaan filteren");
  });

  it("should emit dsoCloseFilterPanel event", () => {
    cy.visit(url)
      .get("dso-viewer-grid.hydrated")
      .then((e) => e.on("dsoCloseFilterPanel", cy.stub().as("listener")))
      .invoke("attr", "filter-panel-title", "Filters")
      .invoke("attr", "filter-panel-open", "")
      .get("dso-viewer-grid.hydrated")
      .shadow()
      .find(".filter-panel .dso-close")
      .click();

    cy.get("@listener").should("be.calledOnce");
  });

  it('should say "Breedte documentpaneel: [smal / middel / breed]" upon size change', () => {
    cy.visit(url);

    cy.get("dso-viewer-grid.hydrated")
      .invoke("attr", "document-panel-open", "")
      .shadow()
      .as("root")
      .find(".sizing-buttons > span.sr-only")
      .should("have.attr", "aria-live", "polite");

    shouldHavePhrase("smal");

    expand();

    shouldHavePhrase("middel");

    expand();

    shouldHavePhrase("breed");

    shrink();

    shouldHavePhrase("middel");
  });

  it("should show tabs on small screen", () => {
    cy.visit(url);

    cy.viewport(400, 600)
      .get("dso-viewer-grid.hydrated")
      .then((e) => e.on("dsoActiveTabSwitch", cy.stub().as("dsoActiveTabSwitch")))
      .invoke("attr", "active-tab", "search")
      .shadow()
      .as("dsoViewerGrid")
      .find("nav")
      .should("exist")
      .and("be.visible")
      .get("@dsoViewerGrid")
      .find("nav > ul > li")
      .should("have.length", 3)
      .eq(0)
      .should("have.text", "Zoeken")
      .get("@dsoViewerGrid")
      .find(".map")
      .should("not.exist")
      .get("@dsoViewerGrid")
      .find(".dso-document-panel")
      .should("not.exist")
      .get("@dsoViewerGrid")
      .find(".dso-main-panel")
      .should("exist")
      .and("be.visible")
      .get("@dsoViewerGrid")
      .find("nav > ul > li")
      .should("have.length", 3)
      .eq(1)
      .should("have.text", "Kaart")
      .find("button")
      .realClick()
      .get("@dsoActiveTabSwitch")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.include", { tab: "map" })
      .get("dso-viewer-grid.hydrated")
      .invoke("attr", "active-tab", "map")
      .shadow()
      .as("dsoViewerGrid")
      .find(".dso-main-panel")
      .should("not.exist")
      .get("@dsoViewerGrid")
      .find(".dso-document-panel")
      .should("not.exist")
      .get("@dsoViewerGrid")
      .find(".map")
      .should("exist")
      .and("be.visible")
      .get("@dsoViewerGrid")
      .find("nav > ul > li")
      .should("have.length", 3)
      .eq(2)
      .should("have.text", "Document")
      .find("button")
      .realClick()
      .get("@dsoActiveTabSwitch")
      .should("have.been.calledTwice")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("secondCall.args.0.detail")
      .should("deep.include", { tab: "document" })
      .get("dso-viewer-grid.hydrated")
      .invoke("attr", "active-tab", "document")
      .shadow()
      .as("dsoViewerGrid")
      .find(".dso-main-panel")
      .should("not.exist")
      .get("@dsoViewerGrid")
      .find(".map")
      .should("not.exist")
      .get("@dsoViewerGrid")
      .find(".dso-document-panel")
      .should("exist")
      .and("be.visible");
  });
});

function shrink() {
  cy.get("dso-viewer-grid.hydrated")
    .shadow()
    .find(".shrink")
    .click()
    .get("dso-viewer-grid.hydrated")
    .then(($viewerGrid) => {
      const currentSize = $viewerGrid.attr("document-panel-size");

      $viewerGrid.attr("document-panel-size", currentSize === "large" ? "medium" : "small");
    });
}

function expand() {
  cy.get("dso-viewer-grid.hydrated")
    .shadow()
    .find(".expand")
    .click()
    .get("dso-viewer-grid.hydrated")
    .then(($viewerGrid) => {
      const currentSize = $viewerGrid.attr("document-panel-size");

      $viewerGrid.attr("document-panel-size", currentSize === "small" ? "medium" : "large");
    });
}

function shouldHavePhrase(size: string) {
  cy.get("dso-viewer-grid.hydrated")
    .shadow()
    .find(".sizing-buttons > span.sr-only")
    .should("have.text", `Breedte documentpaneel: ${size}`);
}
