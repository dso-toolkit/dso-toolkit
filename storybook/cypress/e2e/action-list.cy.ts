describe("ActionList", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-action-list--default");
  });

  it("screenshot", () => {
    // Added 200ms wait time to overcome timing issue with rendering of several web-components inside nested shadow-root
    // of descendant web-components
    cy.get("dso-action-list.hydrated").wait(1000).matchImageSnapshot();
  });
});
