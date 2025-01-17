describe("Alert", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-alert--success")
      .get("dso-alert")
      .then(($alert) => {
        $alert.on("dsoClose", cy.stub().as("dsoCloseListener"));
      })
      .shadow()
      .as("dsoAlert");
  });

  it("should have button in the content", () => {
    cy.get("@dsoAlert").get(".dso-alert-button");
  });

  it("should hide the close button when closable prop is false", () => {
    cy.get("dso-alert.hydrated").invoke("attr", "closable", "false").shadow().find(".dso-close").should("not.exist");
  });

  it("should show the close button when closable prop is true and emit dsClose when the user closed the alert", () => {
    cy.get("dso-alert.hydrated")
      .invoke("attr", "closable", "true")
      .shadow()
      .find(".dso-close")
      .click()
      .get("@dsoCloseListener")
      .should("have.been.calledOnce");
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
      cy.injectAxe();
      cy.dsoCheckA11y("dso-alert.hydrated");
    });

    it(`should have appropriate Dutch message and icon for status "${status}"`, () => {
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

  const alertsEnglish: Array<{
    status: string;
    message: string;
  }> = [
    { status: "success", message: "Success" },
    { status: "info", message: "Notice" },
    { status: "warning", message: "Warning" },
    { status: "error", message: "Error" },
  ];

  for (const { status, message } of alertsEnglish) {
    it(`should have appropriate English message status "${status}"`, () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-alert--success&globals=locale:en");

      cy.get("dso-alert.hydrated")
        .invoke("attr", "status", status)
        .shadow()
        .find(".alert > span.sr-only")
        .invoke("text")
        .should("equal", `${message}:`);
    });
  }
});
