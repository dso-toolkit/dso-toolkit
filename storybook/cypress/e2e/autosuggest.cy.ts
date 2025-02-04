describe("Autosuggest", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--example");
    cy.injectAxe();
  });

  it("should show suggestions after input", () => {
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.dsoCheckA11y("dso-autosuggest.hydrated");
    cy.get("dso-autosuggest.hydrated input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.dsoCheckA11y("dso-autosuggest.hydrated");
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").should("have.length", 10);

    // Take the entire page, otherwise the list of suggestions will not be snapped
    cy.matchImageSnapshot();
  });

  it("should regexp-escape suggestions", () => {
    cy.get("input").focus().type("slopen (");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").should("have.length", 2);
  });

  it("should have correct aria attributes", { browser: "!firefox" }, () => {
    cy.get("input")
      .should("have.attr", "aria-haspopup", "listbox")
      .should("have.attr", "aria-expanded", "false")
      .and("not.have.attr", "aria-controls");

    cy.get("input")
      .should("have.attr", "aria-autocomplete", "list")
      .should("have.attr", "autocomplete", "off")
      .should("have.attr", "aria-activedescendant", "")
      .focus()
      .type("rotterdam");
    cy.wait(200);
    cy.dsoCheckA11y("dso-autosuggest.hydrated");
    cy.get("input").should("have.attr", "aria-expanded", "true");

    cy.get("dso-autosuggest.hydrated")
      .find("ul[role='listbox']")
      .then(($listbox) => cy.get("input").should("have.attr", "aria-controls", $listbox.prop("id")));

    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.dsoCheckA11y("dso-autosuggest.hydrated");
    cy.get("input").should("have.attr", "aria-activedescendant", "autosuggestInputId-2");
  });

  it("escape should hide suggestions", { browser: "!firefox" }, () => {
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.realPress("Escape");
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
  });

  it("ArrowDown should select first option", { browser: "!firefox" }, () => {
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.realPress("ArrowDown");
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").eq(0).should("have.attr", "aria-selected", "true");
  });

  it("ArrowUp should select last option", { browser: "!firefox" }, () => {
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.realPress("ArrowUp");
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").eq(9).should("have.attr", "aria-selected", "true");
  });

  it("should pick option with keyboard navigation and not change input value", { browser: "!firefox" }, () => {
    cy.get("dso-autosuggest.hydrated").then((c) => {
      c.get(0).addEventListener("dsoSelect", cy.stub().as("dsoSelect"));
    });
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.get("input").type("{enter}").invoke("val").should("eq", "rotterdam");
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.get("@dsoSelect").should("have.been.calledOnce");
  });

  it("mouse enter should select option", () => {
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated")
      .find("li[role='option']")
      .eq(0)
      .trigger("mouseenter")
      .should("have.attr", "aria-selected", "true");
  });

  it("mouse leave should deselect option", () => {
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated")
      .find("li[role='option']")
      .eq(0)
      .trigger("mouseleave")
      .should("have.attr", "aria-selected", "false");
  });

  it("mouse click should pick option and not change input value", () => {
    cy.get("dso-autosuggest.hydrated").then((c) => {
      c.get(0).addEventListener("dsoSelect", cy.stub().as("selected"));
    });
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").eq(0).trigger("mouseenter").click();
    cy.get("input").invoke("val").should("eq", "rotterdam");
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.get("@selected").should("have.been.calledOnce");
  });

  it("should mark terms in options", () => {
    cy.get("input").focus().type("rot dam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").eq(0).find("mark").as("mark");
    cy.get("@mark").eq(0).should("contain", "Rot");
    cy.get("@mark").eq(1).should("contain", "dam");
    cy.get("@mark").eq(2).should("contain", "Rot");
    cy.get("@mark").eq(3).should("contain", "dam");
  });

  it("should ignore space after terms while marking terms", () => {
    cy.get("input").focus().type("u ");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").eq(0).find("mark").eq(0).should("contain", "U");
  });

  it("should show type in options", () => {
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").eq(0).should("not.contain", "adres in Rotterdam");
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").eq(1).should("contain", "adres in Rotterdam");
  });

  it("suggestOnFocus should show suggestions on focus by keyboard", { browser: "!firefox" }, () => {
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.realPress("Tab");
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.realPress(["Shift", "Tab"]);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");

    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--example&args=suggestOnFocus:true");

    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.realPress(["Shift", "Tab"]);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.realPress("Tab");
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").should("have.length", 10);
  });

  it("suggestOnFocus should show suggestions on focus by mouse", () => {
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("body").click("top");
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.get("input").click("bottomRight", { force: true });
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");

    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--example&args=suggestOnFocus:true");

    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("body").click("bottomRight", { force: true });
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.get("input").click();
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").should("have.length", 10);
  });

  it("escape should not emit dsoChange event", { browser: "!firefox" }, () => {
    cy.get("dso-autosuggest.hydrated").then((c) => {
      c.get(0).addEventListener("dsoSelect", cy.stub().as("dsoSelect"));
    });
    cy.get("input").focus().type("rot");
    cy.wait(200);
    cy.realPress("Escape");
    cy.get("input").type("{enter}");
    cy.get("@dsoSelect").should("not.have.been.called");
  });

  it("should not emit dsoSearch event on suggestion select with mouse click", () => {
    cy.get("dso-autosuggest.hydrated").then((c) => {
      c.get(0).addEventListener("dsoSearch", cy.stub().as("dsoSearch"));
    });
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").eq(0).trigger("mouseenter").click();
    cy.get("@dsoSearch").should("not.have.been.called");
  });

  it("should not emit dsoSearch event on suggestion select with enter", { browser: "!firefox" }, () => {
    cy.get("dso-autosuggest.hydrated").then((c) => {
      c.get(0).addEventListener("dsoSearch", cy.stub().as("dsoSearch"));
    });
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.realPress("ArrowDown");
    cy.get("input").type("{enter}");
    cy.get("@dsoSearch").should("not.have.been.called");
  });

  it("should emit dsoSearch event on enter in input", () => {
    cy.get("dso-autosuggest.hydrated").then((c) => {
      c.get(0).addEventListener("dsoSearch", cy.stub().as("dsoSearch"));
    });
    cy.get("input").focus().type("rotterdam{enter}");
    cy.get("@dsoSearch").should("have.been.calledOnce").its("firstCall.args.0.detail").should("equal", "rotterdam");
  });

  it("should pass supplied object to dsoSelect event", () => {
    cy.get("dso-autosuggest.hydrated").then((c) => {
      c.get(0).addEventListener("dsoSelect", cy.stub().as("selected"));
    });
    cy.get("input").focus().type("rotterdam");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").eq(3).trigger("mouseenter").click();
    cy.get("@selected").should("have.been.calledWithMatch", {
      detail: {
        type: "adres in Rotterdam",
        value: "Rotterdamse Rijweg 1A, 3043BE Rotterdam",
        item: 123,
      },
    });
  });

  it("should show progress indicator when loading attribute is set", () => {
    cy.get("dso-autosuggest.hydrated").invoke("attr", "loading", true);
    cy.get("input").focus().type("ams");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.get("dso-autosuggest.hydrated").find("dso-progress-indicator").should("be.visible");
  });

  it("should remove progress indicator when loading attribute is removed", () => {
    cy.get("dso-autosuggest.hydrated").invoke("attr", "loading", true);
    cy.get("input").focus().type("ams");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.get("dso-progress-indicator").should("be.visible");
    cy.get("dso-autosuggest.hydrated").invoke("attr", "loading", false);
    cy.get("dso-progress-indicator").should("not.exist");
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
  });

  it("should show progress indicator with custom label when loadingLabel attribute is set", () => {
    cy.get("dso-autosuggest.hydrated").invoke("attr", "loading", true);
    cy.get("dso-autosuggest.hydrated").invoke("attr", "loading-label", "Patience");
    cy.get("input").focus().type("ams");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.get("dso-autosuggest.hydrated").find("dso-progress-indicator").should("be.visible");
    cy.get("dso-autosuggest.hydrated")
      .find("dso-progress-indicator")
      .shadow()
      .find(".dso-progress-indicator-label")
      .should("be.visible")
      .contains("Patience");
  });

  it("should delay progress indicator when loadingDelayed is set", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--example&args=loadingDelayed:1000");
    cy.get("input")
      .focus()
      .type("ams")
      .wait(200)
      .get("dso-autosuggest.hydrated")
      .invoke("attr", "loading", true)
      .find("dso-progress-indicator")
      .should("not.exist")
      .wait(1000)
      .get("dso-autosuggest.hydrated")
      .find("dso-progress-indicator")
      .should("be.visible")
      .wait(1500)
      .get("dso-autosuggest.hydrated")
      .invoke("attr", "loading", false)
      .find("dso-progress-indicator")
      .should("not.exist");
  });

  it("should show not found text in Dutch when no results are found", () => {
    cy.get("input").focus().type("akjehfowef");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("dso-autosuggest.hydrated").find("li").should("have.length", 1);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox'] li mark").should("be.visible").contains("akjehfowef");
    cy.get("dso-autosuggest.hydrated")
      .find("ul[role='listbox'] li span")
      .should("be.visible")
      .contains("is niet gevonden.");

    cy.matchImageSnapshot({ clip: { x: 0, y: 0, width: 1000, height: 150 } });
  });

  it("should show not found text in English when no results are found", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--example&globals=locale:en");
    cy.get("input").focus().type("akjehfowef");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("dso-autosuggest.hydrated").find("li").should("have.length", 1);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox'] li mark").should("be.visible").contains("akjehfowef");
    cy.get("dso-autosuggest.hydrated")
      .find("ul[role='listbox'] li span")
      .should("be.visible")
      .contains("was not found.");

    cy.matchImageSnapshot({ clip: { x: 0, y: 0, width: 1000, height: 150 } });
  });

  it("should escape special characters (only once)", () => {
    cy.get("input").focus().type("'hardee");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox'] li mark").should("be.visible").contains("'hardee");
  });

  it("should show custom not found text when notFoundLabel attribute is set and no results are found", () => {
    cy.get("dso-autosuggest.hydrated").invoke("attr", "not-found-label", "Er zijn geen resultaten gevonden.");
    cy.get("input").focus().type("akjehfowef");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("dso-autosuggest.hydrated").find("li").should("have.length", 1);
    cy.get("dso-autosuggest.hydrated")
      .find("li span")
      .should("be.visible")
      .contains("Er zijn geen resultaten gevonden.");
  });

  it("should hide listbox when there is no input value", () => {
    cy.get("input").focus().type("akjehfowef");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("input").focus().clear();
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
    cy.get("input").focus().type("ams");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("input").focus().clear();
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("not.exist");
  });

  it('should not show "not found" when suggestions are null', () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--minimal-3-characters");

    cy.get("#suggestions-demo")
      .as("pre")
      .should("have.text", "null")
      .get("input")
      .focus()
      .type("ddd")
      .get("dso-autosuggest.hydrated")
      .find("ul[role='listbox']")
      .should("be.visible")
      .get("@pre")
      .should("have.text", "[]")
      .get("input")
      .focus()
      .realPress("Backspace")
      .get("dso-autosuggest.hydrated")
      .find("ul[role='listbox']")
      .should("not.exist")
      .get("@pre")
      .should("have.text", "null");
  });

  it("should mark suggestion based on consumer provided AutosuggestMarkItems", () => {
    cy.visit("http://localhost:45000/iframe.html?id=core-autosuggest--with-provided-mark-function");

    cy.get("input").focus().type("gro");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.get("dso-autosuggest.hydrated").find("li[role='option']").should("have.length", 2);

    cy.get("dso-autosuggest.hydrated")
      .find("li[role='option'] .suggestion-row .value")
      .should("contain", "evingsplan gemeente Groningen");

    cy.get("dso-autosuggest.hydrated").find("li[role='option'] .suggestion-row .value mark").should("contain", "Omg");

    cy.get("dso-autosuggest.hydrated")
      .find("li[role='option'] .suggestion-row .type")
      .should("contain", "evingsplan (")
      .and("contain", "evingswet)");
    cy.get("dso-autosuggest.hydrated").find("li[role='option'] .suggestion-row .type mark").should("contain", "omg");

    cy.get("dso-autosuggest.hydrated")
      .find("li[role='option'] .suggestion-row .extra")
      .should("contain", "Ontwerp ")
      .and("contain", "01-2024");
    cy.get("dso-autosuggest.hydrated").find("li[role='option'] .suggestion-row .extra mark").should("contain", "18-");

    cy.get("dso-autosuggest.hydrated")
      .find("li[role='option'] .suggestion-row .extra")
      .should("contain", "gemeente Gron")
      .and("contain", "en");
    cy.get("dso-autosuggest.hydrated").find("li[role='option'] .suggestion-row .extra mark").should("contain", "ing");

    cy.get("dso-autosuggest.hydrated")
      .find("li[role='option'] .suggestion-row .extra")
      .should("contain", "/akn/nl/act/gm0014/2020/")
      .and("contain", "evingsplan");
    cy.get("dso-autosuggest.hydrated").find("li[role='option'] .suggestion-row .extra mark").should("contain", "omg");
  });

  it("should limit the block-size of the listbox-container to 10 items", () => {
    cy.get("input").focus().type("sugg");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.matchImageSnapshot();
  });

  it("should limit the block-size of the listbox-container to the available block-size within viewport", () => {
    cy.viewport(1000, 338);
    cy.wait(200);
    cy.get("input").focus().type("sugg");
    cy.wait(200);
    cy.get("dso-autosuggest.hydrated").find("ul[role='listbox']").should("be.visible");
    cy.matchImageSnapshot();
  });
});
