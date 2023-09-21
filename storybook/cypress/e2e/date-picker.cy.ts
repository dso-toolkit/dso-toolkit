describe("Date Picker", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-date-picker--with-label");
    cy.injectAxe();
  });

  it("should have label", () => {
    cy.get("dso-date-picker")
      .should("have.attr", "identifier")
      .and("not.be.empty")
      .then((id) => {
        cy.get(`label[for="${id}"]`).should("exist").and("not.be.empty");
      });

    cy.percySnapshot();
  });

  it("should emit changed event", () => {
    cy.get("dso-date-picker").then((e) => {
      e.get(0).addEventListener("dsoDateChange", cy.stub().as("dateChange"));
    });

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .focus()
      .realPress("0")
      .realPress("5")
      .realPress("0")
      .realPress("2")
      .realPress("2")
      .realPress("0")
      .realPress("1")
      .realPress("5")
      .get("@dateChange")
      .should("have.been.called");
  });

  it.skip("should emit changed event on valid input", () => {
    cy.get("dso-date-picker").then((e) => {
      e.get(0).addEventListener("dsoDateChange", cy.stub().as("dateChange"));
    });

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .focus()
      .realPress("1")
      .realPress("1")
      .realPress("0")
      .realPress("4")
      .realPress("1")
      .realPress("9")
      .realPress("7")
      .realPress("0")
      .get("@dateChange")
      .and("have.been.calledWith", Cypress.sinon.match.object)
      .its("lastCall.args.0.detail")
      .should("deep.equal", { value: "11-4-1970", valueAsDate: new Date(1970, 3, 11) });
  });

  it("should padStart days and months with 0", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-date-picker--with-label&args=value:1-1-2000");
    cy.get("dso-date-picker").find("input.dso-date__input").should("have.value", "2000-01-01");
  });

  it.skip("should autofocus", () => {
    cy.get("dso-date-picker").find("input.dso-date__input").should("not.have.focus");

    cy.visit("http://localhost:45000/iframe.html?id=core-date-picker--with-label&args=autofocus:!true");

    cy.get("dso-date-picker").find("input.dso-date__input").should("have.focus");
  });

  it("should emit keyboard events", () => {
    const keys = [];
    cy.get("dso-date-picker").then((datePicker) => {
      datePicker
        .get(0)
        .addEventListener("dsoKeyDown", (event: CustomEvent) => keys.push(event.detail.originalEvent.key));
      datePicker.get(0).addEventListener("dsoKeyUp", (event: CustomEvent) => keys.push(event.detail.originalEvent.key));
    });

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .focus()
      .realPress("1")
      .realPress("2")
      .realPress("Enter")
      .then(() => {
        expect(keys).deep.equal(["1", "1", "2", "2", "Enter", "Enter"]);
      });
  });

  it.skip("should allow and show invalid input", () => {
    const details = [];
    cy.get("dso-date-picker").then((datePicker) => {
      datePicker.get(0).addEventListener("dsoDateChange", (event: CustomEvent) => details.push(event.detail));
    });

    cy.get("dso-date-picker input.dso-date__input")
      .as("input")
      .type("11-04-1970")
      .realPress("{backspace}")
      .get("@input")
      .should("have.value", "11-04-197")
      .wrap(details)
      .invoke("at", -1)
      .should("deep.equal", {
        component: "dso-date-picker",
        error: "invalid",
        value: "11-04-197",
        valueAsDate: undefined,
      });
  });

  it.skip("keep cursor in correct position when editing date", () => {
    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .type("11-04-1970")
      .should("have.prop", "selectionStart", 10)
      .invoke("prop", "selectionStart", 2)
      .invoke("prop", "selectionEnd", 2)
      .realPress("{backspace}")
      .get("dso-date-picker input.dso-date__input")
      .should("have.prop", "selectionStart", 1);
  });

  it("should have an invalid state", () => {
    cy.get("dso-date-picker")
      .invoke("attr", "invalid", "true")
      .find(".dso-date__input")
      .should("have.css", "border-color", "rgb(206, 63, 81)")
      .and("have.attr", "aria-invalid", "true");
  });

  it("should set aria-describedby", () => {
    cy.get("dso-date-picker")
      .invoke("attr", "described-by", "id-van-ander-element")
      .find(".dso-date__input")
      .should("have.attr", "aria-describedby", "id-van-ander-element");
  });
});
