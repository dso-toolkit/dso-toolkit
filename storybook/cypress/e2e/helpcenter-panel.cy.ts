describe("Helpcenter panel", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-helpcenter-panel--helpcenter-panel");

    cy.get("dso-helpcenter-panel")
      .should("have.attr", "label", "Hulp nodig")
      .shadow()
      .as("dsoHelpcenterPanel")
      .find("div.wrapper div.iframe-container")
      .as("iframeContainer")
      .get("@dsoHelpcenterPanel")
      .find("button.open-button")
      .as("openButton")
      .get("@dsoHelpcenterPanel")
      .find("div.wrapper button.close-button")
      .as("closeButton");
  });

  const url = window.location.origin + "/iframe.html?id=core-helpcenter-panel--helpcenter-panel&viewMode=docs";

  const transitionTime = 500;

  it("should be accessible", () => {
    cy.injectAxe();
    cy.checkA11y("dso-helpcenter-panel");
    cy.get("@dsoHelpcenterPanel")
      .find("#dso-panel-wrapper")
      .should("have.attr", "aria-label", "helpcentrum")
      .and("have.attr", "role", "dialog")
      .get("@closeButton")
      .should("have.attr", "aria-expanded", "false")
      .and("have.attr", "aria-controls", "dso-panel-wrapper")
      .get("@openButton")
      .should("have.attr", "aria-expanded", "false")
      .and("have.attr", "aria-controls", "dso-panel-wrapper")
      .click()
      .should("have.attr", "aria-expanded", "true")
      .get("@closeButton")
      .should("have.attr", "aria-expanded", "true");
  });

  it("should open panel on help button click", () => {
    cy.get("@dsoHelpcenterPanel").matchImageSnapshot();

    cy.get("@iframeContainer")
      .should("have.class", "close")
      .get("@openButton")
      .should("have.class", "close")
      .click()
      .wait(transitionTime)
      .get("@iframeContainer")
      .should("have.class", "open")
      .find("iframe")
      .should("be.visible")
      .get("@openButton")
      .should("have.class", "open");

    cy.get("@dsoHelpcenterPanel").matchImageSnapshot(`${Cypress.currentTest.title}" -- opened`);
  });

  it.skip("should not load iframe when panel is closed", () => {
    const secondUrl = window.location.origin + "/iframe.html?id=core-icon--icon&viewMode=docs";

    cy.get("@openButton")
      .click()
      .get("@iframeContainer")
      .find("iframe")
      .as("iframe")
      .then(($iframe) => new Cypress.Promise((resolve) => $iframe.on("load", () => resolve())))
      .get("@iframe")
      .should("have.attr", "src", url)
      .get("@closeButton")
      .click()
      .wait(transitionTime)
      .get("dso-helpcenter-panel")
      .invoke("attr", "url", secondUrl)
      .get("@iframe")
      .should("have.attr", "src", url)
      .get("@openButton")
      .click()
      .get("@iframeContainer")
      .find("iframe")
      .then(($iframe) => new Cypress.Promise((resolve) => $iframe.on("load", () => resolve())))
      .get("@iframe")
      .should("have.attr", "src", secondUrl);
  });

  it("should close panel on escape", () => {
    cy.get("@openButton")
      .click()
      .get("@iframeContainer")
      .find("iframe")
      .then(($iframe) => new Cypress.Promise((resolve) => $iframe.on("load", () => resolve())))
      .wait(transitionTime)
      .get("@iframeContainer")
      .should("be.visible")
      .and("have.class", "open")
      .realPress("Escape")
      .wait(transitionTime)
      .get("@iframeContainer")
      .should("not.be.visible")
      .and("have.class", "close");
  });

  it("should prevent scrolling when panel is open", () => {
    cy.get("body")
      .should("not.have.css", "overflow", "hidden")
      .get("@openButton")
      .click()
      .get("body")
      .should("have.css", "overflow", "hidden");
  });

  it("should trap focus on panel open", () => {
    cy.get("@openButton")
      .click()
      .get("@iframeContainer")
      .find("iframe")
      .then(($iframe) => new Cypress.Promise((resolve) => $iframe.on("load", () => resolve())))
      .wait(100)
      .get("@closeButton")
      .should("have.focus")
      .realPress("Tab")
      .get("@iframeContainer")
      .find("iframe")
      .should("have.focus");
  });

  it("should be responsive", () => {
    cy.get("@openButton")
      .click()
      .viewport(768, 660)
      .get("@iframeContainer")
      .invoke("css", "width")
      .then((str) => parseInt("" + str, 10))
      .should("equal", 640)
      .viewport(767, 660)
      .get("@iframeContainer")
      .invoke("css", "width")
      .then((str) => parseInt("" + str, 10))
      .should("equal", 480)
      .viewport(481, 660)
      .get("@iframeContainer")
      .invoke("css", "width")
      .then((str) => parseInt("" + str, 10))
      .should("equal", 480)
      .viewport(480, 660)
      .get("@iframeContainer")
      .invoke("css", "width")
      .then((str) => parseInt("" + str, 10))
      .should("equal", 320);
  });
});
