describe("Date Picker", () => {
  const ANIMATION_TIME = 400; // Keep in sync with date-picker.scss $date-picker-transition-duration

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

  it("should have focus trap", () => {
    cy.get("dso-date-picker").as("date-picker").find("button.dso-date__toggle").click();

    cy.get("@date-picker").find(".dso-date__dialog :focus").should("have.focus");

    cy.get("@date-picker").find("select.dso-date__select--month").should("have.focus").realPress("Tab");

    cy.get("@date-picker").find("select.dso-date__select--year").should("have.focus").realPress("Tab");

    cy.get("@date-picker").find("button.dso-date__prev").should("have.focus").realPress("Tab");

    cy.get("@date-picker").find("button.dso-date__next").should("have.focus").realPress("Tab");

    cy.get("@date-picker").find("button.dso-date__day.is-today").should("have.focus").realPress("Tab");

    cy.get("@date-picker").find("button.dso-date__close").should("have.focus").realPress("Tab");

    cy.get("@date-picker").find("select.dso-date__select--month").should("have.focus").realPress("Escape");

    cy.get("@date-picker").find("button.dso-date__toggle").should("have.focus");
  });

  it("ESCAPE should close date picker and focus toggle button", () => {
    cy.get("dso-date-picker").as("date-picker");

    cy.get("@date-picker").find("button.dso-date__toggle").click();

    cy.get("@date-picker").find(".dso-date__dialog :focus").should("have.focus");

    cy.realPress("Escape");

    cy.get("@date-picker").find(".dso-date__dialog").should("not.have.class", "is-active").and("not.be.visible");

    cy.get("@date-picker").find("button.dso-date__toggle").should("have.focus");
  });

  it("should navigate by keyboard", () => {
    cy.get("dso-date-picker")
      // Prepare date picker, cy.clock() doesn't work (presumably because of Stencil dev env)
      .invoke("attr", "value", "19-09-1988")
      .should("have.attr", "value", "19-09-1988")
      // End preparation
      .as("date-picker");

    cy.get("@date-picker").find("button.dso-date__toggle").click();

    cy.get("@date-picker").find(".dso-date__dialog :focus").should("have.focus");

    cy.realPress("Tab");
    cy.realPress("Tab");
    cy.realPress("Tab");
    cy.realPress("Tab");

    cy.get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should("have.focus")
      .realPress("ArrowUp");

    cy.get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(12))')
      .should("have.focus")
      .realPress("ArrowRight");

    cy.get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(13))')
      .should("have.focus")
      .realPress("ArrowDown");

    cy.get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(20))')
      .should("have.focus")
      .realPress("ArrowLeft");

    cy.get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should("have.focus")
      .realPress("ArrowLeft");

    cy.get("@date-picker").find('button.dso-date__day:has(span[aria-hidden="true"]:contains(18))').should("have.focus");

    cy.realPress("ArrowRight");
    cy.realPress("ArrowRight");
    cy.realPress("ArrowRight");
    cy.realPress("ArrowRight");
    cy.realPress("ArrowRight");
    cy.realPress("ArrowRight");
    cy.realPress("ArrowRight");
    cy.realPress("ArrowRight");

    cy.get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(26))')
      .should("have.focus")
      .realPress("ArrowUp");

    cy.get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should("have.focus")
      .realPress("End");

    cy.get("@date-picker").find('button.dso-date__day:has(span[aria-hidden="true"]:contains(26))').realPress("Home");

    cy.get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should("have.focus")
      .realPress("PageDown");

    cy.get("@date-picker")
      .find("select.dso-date__select--month")
      .should("have.value", "9")
      .get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should("have.focus")
      .realPress("PageUp");

    cy.get("@date-picker")
      .find("select.dso-date__select--month")
      .should("have.value", "8")
      .get("@date-picker")
      .find('button.dso-date__day:has(span[aria-hidden="true"]:contains(19))')
      .should("have.focus");
  });

  it("should select first day of current month", () => {
    const now = new Date();

    cy.checkA11y("dso-date-picker");

    cy.get("dso-date-picker").as("root").find("button.dso-date__toggle").click();

    // We need to wait for color contrast checks, during the fade-in/fade-out the computed color code is returning a faded color code
    cy.wait(ANIMATION_TIME).checkA11y("dso-date-picker");

    cy.get("@root").find(".dso-date__day.is-today").click();

    cy.wait(ANIMATION_TIME).checkA11y("dso-date-picker");

    cy.get("dso-date-picker")
      .invoke("attr", "value")
      .should(
        "equal",
        `${now.getDate().toString(10).padStart(2, "0")}-${(now.getMonth() + 1).toString(10).padStart(2, "0")}-${now
          .getFullYear()
          .toString(10)
          .padStart(2, "0")}`
      );
  });

  it("should open and close using instance methods", () => {
    cy.get("dso-date-picker")
      .then(($element: JQuery<HTMLDsoDatePickerElement>) => {
        $element.get(0).show();
      })
      .get(".dso-date__dialog.is-active", { includeShadowDom: true })
      .should("be.visible")
      .get("dso-date-picker")
      .then(($element: JQuery<HTMLDsoDatePickerElement>) => {
        $element.get(0).hide();
      })
      .get(".dso-date__dialog", { includeShadowDom: true })
      .should("not.have.class", "is-active")
      .should("not.be.visible");
  });

  it("should select February 5th, 2015", () => {
    cy.get("dso-date-picker").then((e) => {
      e.get(0).addEventListener("dsoDateChange", cy.stub().as("dateChange"));
    });

    cy.get("dso-date-picker")
      .as("root")
      .find("button.dso-date__toggle")
      .click()
      .wait(ANIMATION_TIME)
      .get("@root")
      .find("select.dso-date__select--year")
      .select("2015")
      .get("@root")
      .find("select.dso-date__select--month")
      .select("Februari")
      .get("@root")
      .find("table.dso-date__table button > span.dso-date__vhidden")
      .contains("05-02-2015")
      .closest("button")
      .click();

    cy.get("@dateChange").should("have.been.calledOnce");
  });

  it("should emit changed event on invalid input", () => {
    const details = [];
    cy.get("dso-date-picker").then((datePicker) => {
      datePicker.get(0).addEventListener("dsoDateChange", (event: CustomEvent) => details.push(event.detail));
    });

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .type("34-56")
      .then(() => {
        expect(details.length).equal(5);
        expect(details.filter((e) => e.error === "invalid").length).equal(5);
        expect(details[2].value).equal("34-");
      });
  });

  it("should only allow date characters input", () => {
    cy.get("dso-date-picker").then(($datePicker) => {
      $datePicker.on("dsoDateChange", cy.stub().as("listener"));
    });

    const allowedChars = "-0123456789";
    const ignoredChars = Array.from(Array(95))
      .map((_e, i) => String.fromCharCode(i + 32))
      .filter((c) => !allowedChars.includes(c));

    cy.get("dso-date-picker input.dso-date__input")
      .as("input")
      .type(ignoredChars.join(""))
      .should("have.value", "")
      .get("@listener")
      .its("callCount")
      .should("equal", 1)
      .get("@listener")
      .invoke("getCall", 0)
      .its("args.0.detail")
      .should("deep.equal", { component: "dso-date-picker", value: "", valueAsDate: undefined })
      .get("@input")
      .type(allowedChars)
      .should("have.value", allowedChars)
      .get("@listener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail")
      .should("deep.equal", {
        component: "dso-date-picker",
        value: allowedChars,
        valueAsDate: undefined,
        error: "invalid",
      })
      .get("dso-date-picker")
      .should("have.attr", "value", allowedChars);
  });

  it("should emit changed event with error on date input before min", () => {
    const details = [];
    cy.get("dso-date-picker").then((datePicker) => {
      datePicker.get(0).min = "1-1-2022";
      datePicker.get(0).addEventListener("dsoDateChange", (event: CustomEvent) => details.push(event.detail));
    });

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .type("1-1-2022")
      .then(() => {
        expect(details[details.length - 1].error).undefined;
        expect(details[details.length - 1].value).equal("01-01-2022");
        expect(details[details.length - 1].valueAsDate.getDate()).equal(1);
        expect(details[details.length - 1].valueAsDate.getMonth()).equal(0);
        expect(details[details.length - 1].valueAsDate.getFullYear()).equal(2022);
      });

    cy.get("dso-date-picker").find("input.dso-date__input").clear();

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .type("1-1-2021")
      .then(() => {
        expect(details[details.length - 1].error).equal("min-range");
        expect(details[details.length - 1].value).equal("01-01-2021");
        expect(details[details.length - 1].valueAsDate).undefined;
      });
  });

  it("should emit changed event with error on date input after max", () => {
    const details = [];
    cy.get("dso-date-picker").then((datePicker) => {
      datePicker.get(0).max = "31-12-2021";
      datePicker.get(0).addEventListener("dsoDateChange", (event: CustomEvent) => details.push(event.detail));
    });

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .type("31-12-2021")
      .then(() => {
        expect(details[details.length - 1].error).undefined;
        expect(details[details.length - 1].value).equal("31-12-2021");
        expect(details[details.length - 1].valueAsDate.getFullYear()).equal(2021);
        expect(details[details.length - 1].valueAsDate.getDate()).equal(31);
        expect(details[details.length - 1].valueAsDate.getMonth()).equal(11);
      });

    cy.get("dso-date-picker").find("input.dso-date__input").clear();

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .type("1-1-2022")
      .then(() => {
        expect(details[details.length - 1].error).equal("max-range");
        expect(details[details.length - 1].value).equal("01-01-2022");
        expect(details[details.length - 1].valueAsDate).undefined;
      });
  });

  it("should not allow invalid characters to be pasted", () => {
    const details = [];
    cy.get("dso-date-picker").then((datePicker) => {
      datePicker.get(0).addEventListener("dsoDateChange", (event: CustomEvent) => details.push(event.detail));
    });

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .invoke("val", "zzz")
      .trigger("input")
      .should("have.value", "");

    cy.wrap(details)
      .should("have.length", 1)
      .invoke("at", 0)
      .should("deep.equal", { component: "dso-date-picker", value: "", valueAsDate: undefined });
  });

  it("should emit changed event on valid input", () => {
    const details = [];
    cy.get("dso-date-picker").then((datePicker) => {
      datePicker.get(0).addEventListener("dsoDateChange", (event: CustomEvent) => details.push(event.detail));
    });

    cy.get("dso-date-picker")
      .find("input.dso-date__input")
      .type("11-4-1970")
      .then(() => {
        expect(details[details.length - 1].error).undefined;
        expect(details[details.length - 1].value).equal("11-04-1970");
        expect(details[details.length - 1].valueAsDate).eql(new Date(1970, 3, 11));
      });
  });

  it("should padStart days and months with 0", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-date-picker--with-label&args=value:1-1-2000");
    cy.get("dso-date-picker").find("input.dso-date__input").should("have.value", "01-01-2000");
  });

  it("should autofocus", () => {
    cy.get("dso-date-picker").find("input.dso-date__input").should("not.have.focus");

    cy.visit("http://localhost:45000/iframe.html?id=core-date-picker--with-label&args=autofocus:true");

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
      .type("12")
      .realPress("Enter")
      .then(() => {
        expect(keys).deep.equal(["1", "1", "2", "2", "Enter", "Enter"]);
      });
  });

  it("should allow and show invalid input", () => {
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

  it("closed datepicker should not have invisible calendar", () => {
    cy.get("dso-date-picker").should("have.class", "hydrated").find(".dso-date__dialog").should("be.hidden");
  });

  it("keep cursor in correct position when editing date", () => {
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
});
