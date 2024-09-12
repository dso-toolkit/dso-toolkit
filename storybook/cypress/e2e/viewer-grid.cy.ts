const url = "http://localhost:45000/iframe.html?id=core-viewer-grid--viewer-grid";
const urlOverlayClosed = `${url}&args=overlayOpen:false`;
const urlOverlayOpened = `${url}&args=overlayOpen:true`;

describe("Viewer Grid", () => {
  it("should be accessible (overlay closed)", () => {
    cy.visit(urlOverlayClosed);
    cy.injectAxe();
    cy.dsoCheckA11y("dso-viewer-grid");
  });

  it("should be accessible (overlay opened)", () => {
    cy.visit(urlOverlayOpened);
    cy.injectAxe();
    cy.dsoCheckA11y("dso-viewer-grid");
  });

  it("should not show overlay", () => {
    cy.visit(urlOverlayClosed);
    cy.get("dso-viewer-grid").shadow().find(".overlay").should("exist").and("not.have.attr", "open");
    cy.get("dso-viewer-grid.hydrated").matchImageSnapshot();
  });

  it("should show overlay", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").shadow().find(".overlay").should("exist").and("have.attr", "open");
    cy.get("dso-viewer-grid.hydrated").matchImageSnapshot();
  });

  it("should emit closeOverlay", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").then((c) => {
      c.get(0).addEventListener("dsoCloseOverlay", cy.stub().as("closeOverlay"));
    });
    cy.get("dso-viewer-grid").shadow().find(".overlay-close-button").first().click();
    cy.get("@closeOverlay").should("have.been.calledOnce");
  });

  it("should focus close button on overlay open", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").shadow().find(".overlay-close-button").should("be.focused");
  });

  it("should emit closeOverlay on escape", () => {
    cy.visit(url)
      .get("dso-viewer-grid")
      .then((c) => {
        c.get(0).addEventListener("dsoCloseOverlay", cy.stub().as("closeOverlay"));
      })
      .invoke("attr", "overlay-open", "")
      .get("dso-viewer-grid")
      .shadow()
      .find(".overlay:focus-within")
      .should("exist")
      .and("have.attr", "open")
      .realPress("Escape")
      .get("@closeOverlay")
      .should("have.been.calledOnce");
  });

  it("should toggle filterpanel", () => {
    cy.visit(url);

    cy.get("dso-viewer-grid").shadow().find("#filterpanel").should("be.not.visible");

    cy.get("dso-viewer-grid").invoke("attr", "filterpanel-open", "").shadow().find("#filterpanel").should("be.visible");

    cy.get("dso-viewer-grid")
      .invoke("attr", "filterpanel-open", null)
      .shadow()
      .find("#filterpanel")
      .should("be.not.visible");
  });

  it("should emit filterpanelCancel event", () => {
    filterPanelEventTest("dsoFilterpanelCancel", ".cancel-button");
  });

  it("should emit filterpanelApply event", () => {
    filterPanelEventTest("dsoFilterpanelApply", ".apply-button");
  });

  it("should do nothing when clicking next to filterpanel", () => {
    cy.visit(url);

    const eventListener = cy.stub();

    cy.get("dso-viewer-grid").then((e) =>
      e.on("filterpanelCancel", eventListener).on("filterpanelApply", eventListener),
    );

    cy.get("dso-viewer-grid").invoke("attr", "filterpanel-open", "");

    cy.get('dso-viewer-grid [slot="map"]').click("right", { force: true });

    cy.wrap(eventListener).should("not.be.called");
  });

  it("upon size change it should emit start and end events", () => {
    const expectedSizeDetails = [
      {
        currentSize: "large",
        nextSize: "medium",
      },
      {
        currentSize: "medium",
        nextSize: "large",
      },
    ];

    const expectedAnimationEndDetails = [
      {
        currentSize: "medium",
      },
      {
        currentSize: "large",
      },
    ];

    cy.visit(url);

    const sizeHandler = cy.stub();
    const animationEndHandler = cy.stub();

    cy.get("dso-viewer-grid")
      .then((e) => {
        e.on("dsoMainSizeChange", sizeHandler);
        e.on("dsoMainSizeChangeAnimationEnd", animationEndHandler);
      })
      .shadow()
      .as("root")
      .find(".expand")
      .should("not.exist");

    shrink();

    cy.wait(250);

    expand();

    cy.wait(250)
      .wrap(sizeHandler)
      .should((stub) => {
        const calls = stub.getCalls();

        expect(calls.map((c) => c.args[0]?.detail)).to.deep.equal(expectedSizeDetails);
      })
      .wrap(animationEndHandler)
      .should((stub) => {
        const calls = stub.getCalls();

        expect(calls.map((c) => c.args[0]?.detail)).to.deep.equal(expectedAnimationEndDetails);
      });
  });

  it('should say "Breedte hoofdpaneel: [smal / middel / breed]" upon size change', () => {
    cy.visit(url);

    cy.get("dso-viewer-grid")
      .shadow()
      .as("root")
      .find(".sizing-buttons > span.sr-only")
      .should("have.attr", "aria-live", "polite");

    shouldHavePhrase("breed");

    shrink();

    shouldHavePhrase("middel");

    shrink();

    shouldHavePhrase("smal");

    expand();

    shouldHavePhrase("middel");
  });

  it("should show tabs on small screen", () => {
    cy.visit(url);

    cy.viewport(400, 600)
      .get("dso-viewer-grid")
      .then((e) => e.on("dsoActiveTabSwitch", cy.stub().as("dsoActiveTabSwitch")))
      .invoke("attr", "active-tab", "main")
      .shadow()
      .as("dsoViewerGrid")
      .find("nav")
      .should("exist")
      .and("be.visible")
      .get("@dsoViewerGrid")
      .find("nav > ul > li")
      .should("have.length", 2)
      .eq(0)
      .should("have.text", "Hoofdpaneel")
      .get("@dsoViewerGrid")
      .find(".map")
      .should("not.exist")
      .get("@dsoViewerGrid")
      .find(".dso-main-panel")
      .should("exist")
      .and("be.visible")
      .get("@dsoViewerGrid")
      .find("nav > ul > li")
      .should("have.length", 2)
      .eq(1)
      .should("have.text", "Kaart")
      .find("button")
      .realClick()
      .get("@dsoActiveTabSwitch")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.include", { tab: "map" })
      .get("dso-viewer-grid")
      .invoke("attr", "active-tab", "map")
      .get("dso-viewer-grid")
      .shadow()
      .find(".dso-main-panel")
      .should("not.exist")
      .get("@dsoViewerGrid")
      .find(".map")
      .should("exist")
      .and("be.visible");
  });

  it("should show VDK view", () => {
    cy.visit(url);

    cy.get("dso-viewer-grid")
      .invoke("attr", "mode", "vdk")
      .invoke("attr", "main-size", "small")
      .invoke("attr", "document-panel-size", "small")
      .invoke("attr", "document-panel-open", "true")
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
      .get("dso-viewer-grid")
      .invoke("attr", "main-panel-expanded", "true")
      .get("@viewerGrid")
      .find(".dso-main-panel .sizing-buttons")
      .should("not.exist")
      .get("@viewerGrid")
      .find(".dso-main-panel .toggle-button > button")
      .should("exist")
      .click()
      .get("@dsoMainPanelToggle")
      .should("have.been.calledOnce")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("firstCall.args.0.detail")
      .should("deep.include", { hide: true })
      .get("dso-viewer-grid")
      .invoke("attr", "main-panel-hidden", "true")
      .get("@viewerGrid")
      .find(".dso-main-panel .content")
      .should("have.class", "invisible");
  });

  it("should emit correct currentSize and nextSize", () => {
    cy.visit(url)
      .get("dso-viewer-grid")
      .then(($viewerGrid) =>
        $viewerGrid
          .on("dsoMainSizeChange", cy.stub().as("mainSizeChange"))
          .on("dsoDocumentPanelSizeChange", cy.stub().as("documentPanelSizeChange")),
      )
      .invoke("attr", "main-size")
      .should("equal", "large")
      .get("dso-viewer-grid")
      .invoke("attr", "mode")
      .should("equal", "vrk")
      .get("dso-viewer-grid")
      .shadow()
      .as("shadowRoot")
      .find(".dso-main-panel .shrink")
      .as("mainShrinkButton")
      .click()
      .get("@mainSizeChange")
      .its("lastCall.args.0.detail")
      .should("deep.equal", { currentSize: "large", nextSize: "medium" })
      .get("dso-viewer-grid")
      .invoke("attr", "main-size", "medium")
      .get("@mainShrinkButton")
      .click()
      .get("@mainSizeChange")
      .its("lastCall.args.0.detail")
      .should("deep.equal", { currentSize: "medium", nextSize: "small" })
      .get("@shadowRoot")
      .find(".dso-main-panel .expand")
      .as("mainExpandButton")
      .click()
      .get("@mainSizeChange")
      .its("lastCall.args.0.detail")
      .should("deep.equal", { currentSize: "medium", nextSize: "large" })
      .get("dso-viewer-grid")
      .invoke("attr", "main-size", "small")
      .get("@mainExpandButton")
      .click()
      .get("@mainSizeChange")
      .its("lastCall.args.0.detail")
      .should("deep.equal", { currentSize: "small", nextSize: "medium" })
      .get("dso-viewer-grid")
      .invoke("attr", "document-panel-size")
      .should("equal", "large")
      .get("dso-viewer-grid")
      .invoke("attr", "mode", "vdk")
      .invoke("attr", "document-panel-open", "")
      .get("@shadowRoot")
      .find(".dso-document-panel .shrink")
      .as("documentPanelShrinkButton")
      .click()
      .get("@documentPanelSizeChange")
      .its("lastCall.args.0.detail")
      .should("deep.equal", { currentSize: "large", nextSize: "medium" })
      .get("dso-viewer-grid")
      .invoke("attr", "document-panel-size", "medium")
      .get("@documentPanelShrinkButton")
      .click()
      .get("@documentPanelSizeChange")
      .its("lastCall.args.0.detail")
      .should("deep.equal", { currentSize: "medium", nextSize: "small" })
      .get("@shadowRoot")
      .find(".dso-document-panel .expand")
      .as("documentPanelExpandButton")
      .click()
      .get("@documentPanelSizeChange")
      .its("lastCall.args.0.detail")
      .should("deep.equal", { currentSize: "medium", nextSize: "large" })
      .get("dso-viewer-grid")
      .invoke("attr", "document-panel-size", "small")
      .get("@documentPanelExpandButton")
      .click()
      .get("@documentPanelSizeChange")
      .its("lastCall.args.0.detail")
      .should("deep.equal", { currentSize: "small", nextSize: "medium" });
  });
});

function filterPanelEventTest(eventName: string, buttonSelector: string) {
  cy.visit(url);

  cy.get("dso-viewer-grid").then((e) => e.on(eventName, cy.stub().as("listener")));

  cy.get("dso-viewer-grid")
    .invoke("attr", "filterpanel-open", "")
    .shadow()
    .find(`#filterpanel ${buttonSelector}`)
    .as("filterButtons")
    .first()
    .click();

  cy.get("@listener").should("be.calledOnce");

  cy.get("@filterButtons").last().click();

  cy.get("@listener").should("be.calledTwice");
}

function shrink() {
  cy.get("dso-viewer-grid")
    .shadow()
    .find(".shrink")
    .click()
    .get("dso-viewer-grid")
    .then(($viewerGrid) => {
      const currentSize = $viewerGrid.attr("main-size");

      $viewerGrid.attr("main-size", currentSize === "large" ? "medium" : "small");
    });
}

function expand() {
  cy.get("dso-viewer-grid")
    .shadow()
    .find(".expand")
    .click()
    .get("dso-viewer-grid")
    .then(($viewerGrid) => {
      const currentSize = $viewerGrid.attr("main-size");

      $viewerGrid.attr("main-size", currentSize === "small" ? "medium" : "large");
    });
}

function shouldHavePhrase(size: string) {
  cy.get("dso-viewer-grid")
    .shadow()
    .find(".sizing-buttons > span.sr-only")
    .should("have.text", `Breedte hoofdpaneel: ${size}`);
}
