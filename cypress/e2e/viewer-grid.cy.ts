const url = "http://localhost:45000/iframe.html?id=core-viewer-grid--viewer-grid";
const urlOverlayClosed = `${url}&args=overlayOpen:false`;
const urlOverlayOpened = `${url}&args=overlayOpen:true`;
const urlNoOverlay = `${urlOverlayOpened}&args=noOverlay:true`;

describe("Viewer Grid", () => {
  it("should not show overlay", () => {
    cy.visit(urlOverlayClosed);
    cy.get("dso-viewer-grid").shadow().find(".overlay").should("not.be.visible");
  });

  it("should show overlay", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").shadow().find(".overlay").should("be.visible");
  });

  it("should emit closeOverlay", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").then((c) => {
      c.get(0).addEventListener("dsoCloseOverlay", cy.stub().as("closeOverlay"));
    });
    cy.get("dso-viewer-grid").shadow().find(".overlay-close-button").first().click();
    cy.get("@closeOverlay").should("have.been.calledOnce");
  });

  it("should open large", () => {
    cy.visit(url);
    cy.get("dso-viewer-grid").should("have.attr", "large");
    cy.get("dso-viewer-grid").shadow().find(".shrink").should("not.be.disabled");
    cy.get("dso-viewer-grid").shadow().find(".expand").should("be.disabled");
  });

  it("should open small", () => {
    cy.visit(`${url}&args=initialMainSize:small`);
    cy.get("dso-viewer-grid").should("have.attr", "small");
    cy.get("dso-viewer-grid").shadow().find(".shrink").should("be.disabled");
    cy.get("dso-viewer-grid").shadow().find(".expand").should("not.be.disabled");
  });

  it("should switch to medium", () => {
    cy.visit(url);
    shrink();
    cy.get("dso-viewer-grid").should("have.attr", "medium");
    cy.get("dso-viewer-grid").shadow().find(".shrink").should("not.be.disabled");
    cy.get("dso-viewer-grid").shadow().find(".expand").should("not.be.disabled");
  });

  it("should switch to small", () => {
    cy.visit(url);
    cy.get("dso-viewer-grid").shadow().find(".shrink").click().click();
    cy.get("dso-viewer-grid").should("have.attr", "small");
    cy.get("dso-viewer-grid").shadow().find(".shrink").should("be.disabled");
    cy.get("dso-viewer-grid").shadow().find(".expand").should("not.be.disabled");
  });

  it("should focus close button on overlay open", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").shadow().find(".overlay-close-button").should("be.focused");
  });

  it("should emit closeOverlay on escape", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").then((c) => {
      c.get(0).addEventListener("dsoCloseOverlay", cy.stub().as("closeOverlay"));
    });
    cy.wait(100);
    cy.realPress("Tab"); // We're not focused in the page on visit.
    cy.wait(100);
    cy.realPress("Escape");
    cy.get("@closeOverlay").should("have.been.calledOnce");
  });

  it("should trap focus on overlay open", () => {
    cy.visit(urlOverlayOpened);
    cy.get("dso-viewer-grid").shadow().find(".overlay-close-button").should("be.focused").realPress("Tab");
    cy.get("dso-viewer-grid").find("div[slot = 'overlay'] a[href]").eq(0).should("be.focused").realPress("Tab");
    cy.get("dso-viewer-grid").find("div[slot = 'overlay'] a[href]").eq(1).should("be.focused").realPress("Tab");
    cy.get("dso-viewer-grid").shadow().find(".overlay-close-button").should("be.focused");
  });

  it("should not show overlay", () => {
    cy.visit(urlNoOverlay);
    cy.get("dso-viewer-grid").shadow().find(".overlay").should("not.be.visible");
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

  it("should trap focus on filterpanel open", () => {
    cy.visit(url);

    cy.get("dso-viewer-grid")
      .invoke("attr", "filterpanel-open", "")
      .shadow()
      .find("#filterpanel button")
      .first()
      .as("firstFocussedButton")
      .should("be.focused");

    cy.realPress("Tab");
    cy.realPress("Tab");
    cy.realPress("Tab");
    cy.realPress("Tab");

    cy.get("@firstFocussedButton").should("be.focused");
  });

  it("should do nothing when clicking next to filterpanel", () => {
    cy.visit(url);

    const eventListener = cy.stub();

    cy.get("dso-viewer-grid").then((e) =>
      e.on("filterpanelCancel", eventListener).on("filterpanelApply", eventListener)
    );

    cy.get("dso-viewer-grid").invoke("attr", "filterpanel-open", "");

    cy.get('dso-viewer-grid [slot="map"]').click("right", { force: true });

    cy.wrap(eventListener).should("not.be.called");
  });

  it("uppon size change it should emit start and end events", () => {
    const expected = [
      {
        stage: "start",
        previousSize: "large",
        currentSize: "medium",
      },
      {
        stage: "end",
        previousSize: "large",
        currentSize: "medium",
      },
      {
        stage: "start",
        previousSize: "medium",
        currentSize: "large",
      },
      {
        stage: "end",
        previousSize: "medium",
        currentSize: "large",
      },
    ];

    cy.visit(url);

    const sizeHandler = cy.stub();

    cy.get("dso-viewer-grid")
      .then((e) => e.on("dsoMainSizeChange", sizeHandler))
      .shadow()
      .as("root")
      .find(".expand")
      .should("be.disabled");

    shrink();

    cy.wait(250);

    expand();

    cy.wait(250)
      .wrap(sizeHandler)
      .should((stub) => {
        const calls = stub.getCalls();

        expect(calls.map((c) => c.args[0]?.detail)).to.deep.equal(expected);
      });
  });

  it('should say "breedte tekstpaneel: [smal / middel / breed]" upon size change', () => {
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
  cy.get("dso-viewer-grid").shadow().find(".shrink").click();
}

function expand() {
  cy.get("dso-viewer-grid").shadow().find(".expand").click();
}

function shouldHavePhrase(size: string) {
  cy.get("dso-viewer-grid")
    .shadow()
    .find(".sizing-buttons > span.sr-only")
    .should("have.text", `breedte tekstpaneel: ${size}`);
}
