describe("Alert", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-alert--success");
    cy.injectAxe();
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
    { status: "error", message: "Fout", icon: "status-error" },
  ];

  for (const { status, message, icon } of statuses) {
    it("should be accessible", () => {
      cy.checkA11y("dso-alert");
    });

    it(`should have appropriate message and icon for status "${status}"`, () => {
      cy.get("dso-alert.hydrated")
        .invoke("attr", "status", status)
        .shadow()
        .find(".alert > span.sr-only")
        .invoke("text")
        .should("equal", `${message}:`)
        .get("dso-alert")
        .shadow()
        .find(".alert > dso-icon")
        .invoke("prop", "icon")
        .should("equal", icon)
        .get("dso-alert.hydrated")
        .matchImageSnapshot();
    });
  }

  const alerts: Array<{
    status: string;
    message: string;
  }> = [
    { status: "success", message: "Gelukt" },
    { status: "info", message: "Opmerking" },
    { status: "warning", message: "Waarschuwing" },
    { status: "error", message: "Fout" },
  ];
  for (const { status, message } of alerts) {
    it(`should show compact variant for status "${status}"`, () => {
      cy.visit("http://localhost:45000/iframe.html?args=withButton:!false&id=core-alert--success");
      cy.get("dso-alert.hydrated")
        .invoke("attr", "status", status)
        .invoke("attr", "compact", true)
        .shadow()
        .find(".alert > span.sr-only")
        .invoke("text")
        .should("equal", `${message}:`)
        .get("dso-alert")
        .shadow()
        .find(".alert > dso-icon")
        .should("not.exist")
        .get("dso-alert")
        .shadow()
        .find(".alert.dso-compact")
        .should("exist")
        .get("dso-alert.hydrated")
        .matchImageSnapshot();
    });
  }
});
