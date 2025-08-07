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

        cy.dsoCheckA11y("#root-inner");

        cy.get("dso-date-picker.hydrated").matchImageSnapshot();
      });
  });

  it("should emit dsoDateChange event", () => {
    cy.get("dso-date-picker").then(($datePicker) => {
      $datePicker.on("dsoDateChange", cy.stub().as("dateChange"));
    });

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .focus()
      .realType("01011")
      .get("@dateChange")
      .its("lastCall.args.0.detail")
      .as("result")
      .its("value")
      .should("equal", "01-01-0001")
      .get("@result")
      .its("valueAsDate")
      .should("exist")
      .get("@result")
      .its("component")
      .should("equal", "dso-date-picker")
      .get("@result")
      .its("originalEvent")
      .should("exist")
      .get("@result")
      .its("validity")
      .should("exist");
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

  it.only("should emit errors for invalid inputs", () => {
    cy.get("dso-date-picker.hydrated")
      .invoke("attr", "min", "01-01-2024")
      .invoke("attr", "max", "31-12-2025")
      .get("dso-date-picker")
      .then(($datePicker) => $datePicker.on("dsoDateChange", cy.stub().as("dateChange")))
      .get("dso-date-picker")

      .find('input[type="date"]')
      .as("input")
      .type("2024-01-01")
      .trigger("change")
      .get("@dateChange")
      .should("have.been.calledOnce")
      .invoke("getCall", "0")
      .its("args.0.detail.value")
      .should("equal", "01-01-2024")

      .get("@input")
      .realClick()
      .should("be.focused")
      .realPress("{backspace}")
      .get("@dateChange")
      .should("have.been.calledTwice")
      .invoke("getCall", "1")
      .its("args.0.detail")
      .as("detail")
      .its("value")
      .should("equal", "")
      .get("@detail")
      .its("valueAsDate")
      .should("be.undefined")
      .get("@detail")
      .its("error")
      .should("equal", "invalid")

      .get("@input")
      .type("2028-01-01")
      .trigger("change")
      .get("@dateChange")
      .should("have.been.calledThrice")
      .invoke("getCall", "2")
      .its("args.0.detail.error")
      .should("equal", "max-range")

      .get("@input")
      .type("2024-01-01")
      .trigger("change")
      .get("@dateChange")
      .should("have.property", "callCount", 4)
      .get("@dateChange")
      .invoke("getCall", "3")
      .its("args.0.detail.value")
      .should("equal", "01-01-2024")

      .get("@input")
      .type("2020-01-01")
      .trigger("change")
      .get("@dateChange")
      .should("have.property", "callCount", 5)
      .get("@dateChange")
      .invoke("getCall", "4")
      .its("args.0.detail.error")
      .should("equal", "min-range");
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

  it("should set value", () => {
    cy.get("dso-date-picker")
      .invoke("attr", "value", "1-1-3")
      .find(".dso-date__input")
      .should("have.value", "0003-01-01");
  });
});
