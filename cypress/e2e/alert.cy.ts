describe("Alert", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-alert");
  });

  it("should have button", () => {
    cy.get("dso-alert").shadow().get("button");
  });

  const statuses: Array<{
    status: string;
    message: string;
    icon: string;
  }> = [
    { status: "success", message: "Gelukt", icon: "status-success" },
    { status: "info", message: "Opmerking", icon: "status-info" },
    { status: "warning", message: "Waarschuwing", icon: "status-warning" },
    { status: "danger", message: "Fout", icon: "status-danger" },
  ];

  for (const { status, message, icon } of statuses) {
    it(`should have appropriate message and icon for status "${status}"`, () => {
      cy.get("dso-alert")
        .invoke("attr", "status", status)
        .shadow()
        .find(".alert > span.sr-only")
        .invoke("text")
        .should("equal", `${message}:`);

      cy.percySnapshot();

      cy.get("dso-alert").shadow().find(".alert > dso-icon").invoke("prop", "icon").should("equal", icon);
    });
  }
});
