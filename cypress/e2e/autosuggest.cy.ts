describe("Autosuggest", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--example");
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

    cy.percySnapshot();
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
        .should("have.attr", "aria-controls", listbox.prop("id"))
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
    cy.get("@input").should("have.attr", "aria-activedescendant", "autosuggestInputId-2");
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
    cy.get("@listbox").get("li[role='option']").eq(0).should("have.attr", "aria-selected", "true");
  });

  it("ArrowUp should select last option", { browser: "!firefox" }, () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.realPress("ArrowUp");
    cy.get("@listbox").get("li[role='option']").eq(9).should("have.attr", "aria-selected", "true");
  });

  it("should pick option with keyboard navigation and not change input value", { browser: "!firefox" }, () => {
    cy.get("dso-autosuggest").then((c) => {
      c.get(0).addEventListener("dsoSelect", cy.stub().as("dsoSelect"));
    });
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.get("@input").type("{enter}").invoke("val").should("eq", "rotterdam");
    cy.get("@listbox").should("not.be.visible");
    cy.get("@dsoSelect").should("have.been.calledOnce");
  });

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
    cy.get("@listbox").get("li[role='option']").eq(0).trigger("mouseenter").click();
    cy.get("@input").invoke("val").should("eq", "rotterdam");
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
    cy.get("@listbox").get("li[role='option']").eq(0).should("not.contain", "adres in Rotterdam");
    cy.get("@listbox").get("li[role='option']").eq(1).should("contain", "adres in Rotterdam");
  });

  it("suggestOnFocus should show suggestions on focus by keyboard", { browser: "!firefox" }, () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.realPress("Tab");
    cy.get("@listbox").should("not.be.visible");
    cy.realPress(["Shift", "Tab"]);
    cy.get("@listbox").should("not.be.visible");

    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--example&args=suggestOnFocus:true");

    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.realPress(["Shift", "Tab"]);
    cy.get("@listbox").should("not.be.visible");
    cy.realPress("Tab");
    cy.get("@listbox").should("be.visible");
    cy.get("@listbox").get("li[role='option']").should("have.length", 10);
  });

  it("suggestOnFocus should show suggestions on focus by mouse", () => {
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.get("body").click("top");
    cy.get("@listbox").should("not.be.visible");
    cy.get("@input").click("bottomRight", { force: true });
    cy.get("@listbox").should("not.be.visible");

    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--example&args=suggestOnFocus:true");

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

  it("should not emit dsoSearch event on suggestion select with mouse click", () => {
    cy.get("dso-autosuggest").then((c) => {
      c.get(0).addEventListener("dsoSearch", cy.stub().as("dsoSearch"));
    });
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox").get("li[role='option']").eq(0).trigger("mouseenter").click();
    cy.get("@dsoSearch").should("not.have.been.called");
  });

  it("should not emit dsoSearch event on suggestion select with enter", { browser: "!firefox" }, () => {
    cy.get("dso-autosuggest").then((c) => {
      c.get(0).addEventListener("dsoSearch", cy.stub().as("dsoSearch"));
    });
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.get("@input").type("{enter}");
    cy.get("@dsoSearch").should("not.have.been.called");
  });

  it("should emit dsoSearch event on enter in input", () => {
    cy.get("dso-autosuggest").then((c) => {
      c.get(0).addEventListener("dsoSearch", cy.stub().as("dsoSearch"));
    });
    cy.get("@input").focus().type("rotterdam{enter}");
    cy.get("@dsoSearch").should("have.been.calledOnce").its("firstCall.args.0.detail").should("equal", "rotterdam");
  });

  it("should pass supplied object to dsoSelect event", () => {
    cy.get("dso-autosuggest").then((c) => {
      c.get(0).addEventListener("dsoSelect", cy.stub().as("selected"));
    });
    cy.get("@input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("@listbox").get("li[role='option']").eq(3).trigger("mouseenter").click();
    cy.get("@selected").should("have.been.calledWithMatch", {
      detail: {
        type: "adres in Rotterdam",
        value: "Rotterdamse Rijweg 1A, 3043BE Rotterdam",
        item: 123,
      },
    });
  });

  it("should show progress indicator when loading attribute is set", () => {
    cy.get("dso-autosuggest").invoke("attr", "loading", true);
    cy.get("@input").focus().type("ams");
    cy.wait(200);
    cy.get("@listbox").should("not.exist");
    cy.get("dso-progress-indicator").should("be.visible");
  });

  it("should remove progress indicator when loading attribute is removed", () => {
    cy.get("dso-autosuggest").invoke("attr", "loading", true);
    cy.get("@input").focus().type("ams");
    cy.wait(200);
    cy.get("@listbox").should("not.exist");
    cy.get("dso-progress-indicator").should("be.visible");
    cy.get("dso-autosuggest").invoke("attr", "loading", false);
    cy.get("dso-progress-indicator").should("not.exist");
    cy.get("@listbox").should("be.visible");
  });

  it("should show progress indicator with custom label when loadingLabel attribute is set", () => {
    cy.get("dso-autosuggest").invoke("attr", "loading", true);
    cy.get("dso-autosuggest").invoke("attr", "loading-label", "Patience");
    cy.get("@input").focus().type("ams");
    cy.wait(200);
    cy.get("@listbox").should("not.exist");
    cy.get("dso-progress-indicator").should("be.visible");
    cy.get("dso-progress-indicator")
      .shadow()
      .find(".dso-progress-indicator-label")
      .should("exist")
      .contains("Patience");
  });

  it("should delay progress indicator when loadingDelayed is set", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--example&args=loadingDelayed:1000");
    cy.get("@input")
      .focus()
      .type("ams")
      .wait(200)
      .get("dso-autosuggest")
      .invoke("attr", "loading", true)
      .get("dso-progress-indicator")
      .should("not.exist")
      .wait(1000)
      .get("dso-progress-indicator")
      .should("be.visible")
      .wait(1500)
      .get("dso-autosuggest")
      .invoke("attr", "loading", false)
      .get("dso-progress-indicator")
      .should("not.exist");
  });

  it("should show not found text when no results are found", () => {
    cy.get("@input").focus().type("akjehfowef");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.get("@listbox").get("li.sc-dso-autosuggest").should("have.length", 1);
    cy.get("@listbox").get("li mark").should("exist").contains("akjehfowef");
    cy.get("@listbox").get("li span").should("exist").contains("is niet gevonden.");
  });

  it("should show custom not found text when notFoundLabel attribute is set and no results are found", () => {
    cy.get("dso-autosuggest").invoke("attr", "not-found-label", "Er zijn geen resultaten gevonden.");
    cy.get("@input").focus().type("akjehfowef");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.get("@listbox").get("li.sc-dso-autosuggest").should("have.length", 1);
    cy.get("@listbox").get("li span").should("exist").contains("Er zijn geen resultaten gevonden.");
  });

  it("should hide listbox when there is no input value", () => {
    cy.get("@input").focus().type("akjehfowef");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.get("@input").focus().clear();
    cy.wait(200);
    cy.get("@listbox").should("not.be.visible");
    cy.get("@input").focus().type("ams");
    cy.wait(200);
    cy.get("@listbox").should("be.visible");
    cy.get("@input").focus().clear();
    cy.wait(200);
    cy.get("@listbox").should("not.be.visible");
  });

  it('should not show "not found" when suggestions are null', () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--minimal-3-characters");

    cy.get("#suggestions-demo")
      .as("pre")
      .should("have.text", "null")
      .get("@input")
      .focus()
      .type("ddd")
      .get("@listbox")
      .should("be.visible")
      .get("@pre")
      .should("have.text", "[]")
      .get("@input")
      .focus()
      .realPress("Backspace")
      .get("@listbox")
      .should("not.be.visible")
      .get("@pre")
      .should("have.text", "null");
  });
});
