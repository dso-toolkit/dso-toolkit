describe("Autosuggest", () => {
  beforeEach(() => {
    cy.visit("http://localhost:56106/iframe.html?id=autosuggest--example");
    cy.injectAxe();
    cy.get("input").as("input");
    cy.get("ul[role='listbox']").as("listbox");
  });

  it("should show suggestions after input", () => {
    cy.get("@listbox").should("not.be.visible");
    cy.checkA11y("dso-autosuggest");
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.checkA11y("dso-autosuggest");
    cy.get("@listbox").get("li[role='option']").should("have.length", 10);
  });

  it("should regexp-escape suggestions", () => {
    cy.get("@input").focus().type("slopen (");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.get("@listbox").get("li[role='option']").should("have.length", 2);
  });

  it("should have correct aria attributes", { browser: "!firefox" }, () => {
    cy.get("@listbox").each((listbox) => {
      cy.get("@input")
        .should("have.attr", "aria-haspopup", "listbox")
        .should("have.attr", "aria-owns", listbox.prop("id"))
        .should("have.attr", "aria-expanded", "false");
    });
    cy.get("@input")
      .should("have.attr", "aria-autocomplete", "list")
      .should("have.attr", "autocomplete", "off")
      .should("have.attr", "aria-activedescendant", "")
      .focus()
      .type("rotterdam");
    cy.wait(200);
    cy.checkA11y("dso-autosuggest");
    cy.get("@input").should("have.attr", "aria-expanded", "true");
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.checkA11y("dso-autosuggest");
    cy.get("@input").should(
      "have.attr",
      "aria-activedescendant",
      "autosuggestInputId-2"
    );
  });

  it("listbox with no options should not be visible", () => {
    cy.get("@input").focus().type("t");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.get("@input").focus().type("oolkit");
    cy.wait(200);
    cy.get("@listbox").should("not.be.visible");
  });

  it("escape should hide suggestions", { browser: "!firefox" }, () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.realPress("Escape");
    cy.get("@listbox").should("not.be.visible");
  });

  it("ArrowDown should select first option", { browser: "!firefox" }, () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.realPress("ArrowDown");
    cy.get("@listbox")
      .get("li[role='option']")
      .eq(0)
      .should("have.attr", "aria-selected", "true");
  });

  it("ArrowUp should select last option", { browser: "!firefox" }, () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.realPress("ArrowUp");
    cy.get("@listbox")
      .get("li[role='option']")
      .eq(9)
      .should("have.attr", "aria-selected", "true");
  });

  it(
    "should pick option with keyboard navigation and not change input value",
    { browser: "!firefox" },
    () => {
      cy.get("dso-autosuggest").then((c) => {
        c.get(0).addEventListener("dsoSelect", cy.stub().as("dsoSelect"));
      });
      cy.get("@input").focus().type("rotterdam");
      cy.wait(200);
      cy.realPress("ArrowDown");
      cy.realPress("ArrowDown");
      cy.realPress("ArrowDown");
      cy.get("@input")
        .type("{enter}")
        .invoke("val")
        .should("eq", "rotterdam");
      cy.get("@listbox").should("not.be.visible");
      cy.get("@dsoSelect").should("have.been.calledOnce");
    }
  );

  it("mouse enter should select option", () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox")
      .get("li[role='option']")
      .eq(0)
      .trigger("mouseenter")
      .should("have.attr", "aria-selected", "true");
  });

  it("mouse leave should deselect option", () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox")
      .get("li[role='option']")
      .eq(0)
      .trigger("mouseleave")
      .should("have.attr", "aria-selected", "false");
  });

  it("mouse click should pick option and not change input value", () => {
    cy.get("dso-autosuggest").then((c) => {
      c.get(0).addEventListener("dsoSelect", cy.stub().as("selected"));
    });
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox")
      .get("li[role='option']")
      .eq(0)
      .trigger("mouseenter")
      .click();
    cy.get("@input")
      .invoke("val")
      .should("eq", "rotterdam");
    cy.get("@listbox").should("not.be.visible");
    cy.get("@selected").should("have.been.calledOnce");
  });

  it("should mark terms in options", () => {
    cy.get("@input").focus().type("rot dam");
    cy.wait(200);
    cy.get("@listbox").get("li[role='option']").eq(0).get("mark").as("mark");
    cy.get("@mark").eq(0).invoke("text").should("eq", "Rot");
    cy.get("@mark").eq(1).invoke("text").should("eq", "dam");
    cy.get("@mark").eq(2).invoke("text").should("eq", "Rot");
    cy.get("@mark").eq(3).invoke("text").should("eq", "dam");
  });

  it("should ignore space after terms while marking terms", () => {
    cy.get("@input").focus().type("u ");
    cy.wait(200);
    cy.get("@listbox").get("li[role='option']").eq(0).get("mark").as("mark");
    cy.get("@mark").eq(0).invoke("text").should("eq", "U");
  });

  it("should show type in options", () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox")
      .get("li[role='option']")
      .eq(0)
      .should("not.contain", "adres in Rotterdam");
    cy.get("@listbox")
      .get("li[role='option']")
      .eq(1)
      .should("contain", "adres in Rotterdam");
  });

  it(
    "suggestOnFocus should show suggestions on focus by keyboard",
    { browser: "!firefox" },
    () => {
      cy.get("@input").focus().type("rotterdam");
      cy.wait(200);
      cy.get("@listbox").should("be.visible");
      cy.realPress("Tab");
      cy.get("@listbox").should("not.be.visible");
      cy.realPress(["Shift", "Tab"]);
      cy.get("@listbox").should("not.be.visible");

      cy.visit(
        "http://localhost:56106/iframe.html?id=autosuggest--example&args=suggestOnFocus:true"
      );

      cy.get("@input").focus().type("rotterdam");
      cy.wait(200);
      cy.get("@listbox").should("be.visible");
      cy.realPress(["Shift", "Tab"]);
      cy.get("@listbox").should("not.be.visible");
      cy.realPress("Tab");
      cy.get("@listbox").should("be.visible");
      cy.get("@listbox").get("li[role='option']").should("have.length", 10);
    }
  );

  it("suggestOnFocus should show suggestions on focus by mouse", () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.get("body").click('top');
    cy.get("@listbox").should("not.be.visible");
    cy.get("@input").click("bottomRight", { force: true });
    cy.get("@listbox").should("not.be.visible");

    cy.visit(
      "http://localhost:56106/iframe.html?id=autosuggest--example&args=suggestOnFocus:true"
    );

    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.get("body").click("bottomRight", { force: true });
    cy.get("@listbox").should("not.be.visible");
    cy.get("@input").click();
    cy.get("@listbox").should("be.visible");
    cy.get("@listbox").get("li[role='option']").should("have.length", 10);
  });

  it("escape should not emit dsoChange event", { browser: "!firefox" }, () => {
    cy.get("dso-autosuggest").then((c) => {
      c.get(0).addEventListener("dsoSelect", cy.stub().as("dsoSelect"));
    });
    cy.get("@input").focus().type("rot");
    cy.wait(200);
    cy.realPress("Escape");
    cy.get("@input").type("{enter}");
    cy.get("@dsoSelect").should("not.have.been.called");
  });
});
