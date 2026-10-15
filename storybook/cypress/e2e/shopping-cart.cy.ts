function shouldBeHydrated() {
  cy.get("dso-shopping-cart").should("have.class", "hydrated");
  cy.get("dso-shopping-cart-item").should(($items) => {
    expect($items).to.have.length.greaterThan(0);
    expect($items.filter(":not(.hydrated)")).to.have.length(0);
  });
}

describe("Shopping Cart", () => {
  describe("Side", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-shopping-cart--side");
      cy.get("dso-shopping-cart.hydrated", { timeout: 10000 }).should("exist");
    });

    it("matches image snapshot", () => {
      cy.get("dso-shopping-cart.hydrated").matchImageSnapshot("shopping-cart-side");
    });

    it("should be accessible", () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-shopping-cart.hydrated");
    });

    it("renders the Openen icon button in the button slot", () => {
      cy.get("dso-shopping-cart.hydrated")
        .find("dso-icon-button[slot='button']")
        .should("exist")
        .and("be.visible")
        .invoke("prop", "label")
        .should("equal", "Openen");
    });

    it("emits a click event when the user clicks the Openen button", () => {
      cy.get("dso-shopping-cart.hydrated")
        .find("dso-icon-button[slot='button']")
        .then(($button) => {
          $button.on("dsoClick", cy.stub().as("dsoClickListener"));
        })
        .realClick()
        .get("@dsoClickListener")
        .should("be.calledOnce")
        .invoke("getCalls")
        .invoke("at", -1)
        .its("args.0.detail.originalEvent")
        .should("exist");
    });

    it("truncates the item name to two lines", () => {
      cy.get("dso-shopping-cart-item.hydrated")
        .first()
        .children("[slot='name']")
        .should("have.css", "-webkit-line-clamp", "2");
    });

    it("renders the list and listitem roles", () => {
      cy.get("dso-shopping-cart.hydrated").shadow().find("ul.items[role='list']").should("exist");

      cy.get("dso-shopping-cart-item.hydrated").first().should("have.attr", "role", "listitem");
    });

    it("renders a nested list for items with sub items", () => {
      cy.get("dso-shopping-cart-item.hydrated").first().shadow().find("ul.sub-items[role='list']").should("exist");

      cy.get("dso-shopping-cart-item.hydrated dso-shopping-cart-item.hydrated")
        .first()
        .should("have.attr", "role", "listitem");
    });

    it("does not render a nested list for an item without sub items", () => {
      cy.get("dso-shopping-cart-item.hydrated").last().shadow().find("ul.sub-items").should("not.exist");
    });

    it("renders the top-level item name in bold", () => {
      cy.get("dso-shopping-cart-item.hydrated")
        .first()
        .children("[slot='name']")
        .should("have.css", "font-weight", "600");
    });

    it("renders a nested item as sub item", () => {
      cy.get("dso-shopping-cart-item.hydrated dso-shopping-cart-item.hydrated")
        .first()
        .children("[slot='name']")
        .should("have.css", "font-weight", "400");

      cy.get("dso-shopping-cart-item.hydrated dso-shopping-cart-item.hydrated")
        .first()
        .children("[slot='name']")
        .should("have.css", "-webkit-line-clamp", "2");

      cy.get("dso-shopping-cart-item.hydrated dso-shopping-cart-item.hydrated")
        .first()
        .shadow()
        .find(".item-name")
        .should(($itemName) => {
          expect(parseFloat($itemName.css("padding-left"))).to.be.greaterThan(0);
        });
    });

    it("shows only a delete action", () => {
      cy.get("dso-shopping-cart-item.hydrated")
        .first()
        .shadow()
        .find(".item-actions dso-icon-button")
        .should("have.length", 1)
        .invoke("prop", "label")
        .should("contain", "Verwijder");
    });

    it("uses the slotted name in the action label", () => {
      cy.get("dso-shopping-cart-item.hydrated")
        .first()
        .children("[slot='name']")
        .invoke("text")
        .then((name) => {
          cy.get("dso-shopping-cart-item.hydrated")
            .first()
            .shadow()
            .find(".item-actions dso-icon-button")
            .invoke("prop", "label")
            .should("equal", `Verwijder ${name.trim()}`);
        });
    });

    it("updates the action label when the slotted name changes", () => {
      cy.get("dso-shopping-cart-item.hydrated")
        .first()
        .children("[slot='name']")
        .then(($name) => {
          const textNode = Array.from($name[0]!.childNodes).find(
            (node) => node.nodeType === Node.TEXT_NODE && !!node.nodeValue?.trim(),
          );

          textNode!.nodeValue = "Nieuwe naam";
        });

      cy.get("dso-shopping-cart-item.hydrated")
        .first()
        .shadow()
        .find(".item-actions dso-icon-button")
        .invoke("prop", "label")
        .should("equal", "Verwijder Nieuwe naam");
    });
  });

  describe("Main", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-shopping-cart--main");
      cy.get("dso-shopping-cart.hydrated", { timeout: 10000 }).should("exist");
    });

    it("matches image snapshot", () => {
      cy.get("dso-shopping-cart.hydrated").matchImageSnapshot("shopping-cart-main");
    });

    it("should be accessible", () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-shopping-cart.hydrated");
    });

    it("emits dsoEdit when the user clicks the edit action of an item", () => {
      cy.get("dso-shopping-cart-item.hydrated:not([mode='edit'])")
        .first()
        .then(($item) => {
          $item.on("dsoEdit", cy.stub().as("dsoEditListener"));
        })
        .shadow()
        .find(".item-actions dso-icon-button")
        .first()
        .realClick()
        .get("@dsoEditListener")
        .should("be.calledOnce")
        .invoke("getCalls")
        .invoke("at", -1)
        .its("args.0.detail.originalEvent")
        .should("exist");
    });

    it("emits dsoDelete when the user clicks the delete action of an item", () => {
      cy.get("dso-shopping-cart-item.hydrated:not([mode='edit'])")
        .first()
        .then(($item) => {
          $item.on("dsoDelete", cy.stub().as("dsoDeleteListener"));
        })
        .shadow()
        .find(".item-actions dso-icon-button")
        .eq(1)
        .realClick()
        .get("@dsoDeleteListener")
        .should("be.calledOnce");
    });

    it("does not truncate the item name", () => {
      cy.get("dso-shopping-cart-item.hydrated:not([mode='edit'])")
        .first()
        .children("[slot='name']")
        .should("have.css", "-webkit-line-clamp", "none");
    });

    it("emits dsoClose when the user closes the edit mode of an item", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-shopping-cart--main&args=itemMode:edit");
      cy.get("dso-shopping-cart-item.hydrated[mode='edit']")
        .then(($item) => {
          $item.on("dsoClose", cy.stub().as("dsoCloseListener"));
        })
        .shadow()
        .find("button.dso-tertiary")
        .realClick()
        .get("@dsoCloseListener")
        .should("be.calledOnce")
        .invoke("getCalls")
        .invoke("at", -1)
        .its("args.0.detail.originalEvent")
        .should("exist");
    });

    it("renders the Sluiten button in the button slot", () => {
      cy.get("dso-shopping-cart.hydrated")
        .find("button.dso-secondary[slot='button']")
        .should("exist")
        .and("be.visible")
        .invoke("text")
        .should("contain", "Sluiten");
    });

    it("emits a click event when the user clicks the Sluiten button", () => {
      cy.get("dso-shopping-cart.hydrated")
        .find("button.dso-secondary[slot='button']")
        .then(($button) => {
          $button.on("click", cy.stub().as("clickListener"));
        })
        .realClick()
        .get("@clickListener")
        .should("be.calledOnce");
    });

    it("renders the warning slot below the items on a full width white background", () => {
      cy.get("dso-shopping-cart.hydrated")
        .find("[slot='warning']")
        .should("have.css", "background-color", "rgb(255, 255, 255)")
        .and("have.css", "margin", "0px")
        .and("have.css", "padding", "16px")
        .then(($warning) => {
          cy.get("dso-shopping-cart.hydrated").then(($cart) => {
            expect($warning.outerWidth()).to.equal($cart.outerWidth());
          });
        });

      cy.get("dso-shopping-cart.hydrated").shadow().find(".content + slot[name='warning']").should("exist");
    });

    it("renders the Alles verwijderen button in the button slot", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-shopping-cart--main&args=headerButton:alles-verwijderen");
      shouldBeHydrated();

      cy.get("dso-shopping-cart.hydrated")
        .find("button.dso-tertiary[slot='button']")
        .should("exist")
        .and("be.visible")
        .invoke("text")
        .should("contain", "Alles verwijderen");

      cy.get("dso-shopping-cart.hydrated")
        .find("button.dso-tertiary[slot='button'] dso-icon")
        .invoke("prop", "icon")
        .should("equal", "trash");
    });

    it("should be accessible with the Alles verwijderen button", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-shopping-cart--main&args=headerButton:alles-verwijderen");
      shouldBeHydrated();

      cy.injectAxe();
      cy.dsoCheckA11y("dso-shopping-cart.hydrated");
    });

    it("does not render a button in the header when headerButton is geen", () => {
      cy.visit("http://localhost:45000/iframe.html?id=core-shopping-cart--main&args=headerButton:geen");
      shouldBeHydrated();

      cy.get("dso-shopping-cart.hydrated").find("[slot='button']").should("not.exist");
    });

    it("renders a warning icon with the warning text only on items with a warning", () => {
      cy.get("dso-shopping-cart-item.hydrated[warning]")
        .first()
        .shadow()
        .find(".item-name dso-icon")
        .invoke("prop", "icon")
        .should("equal", "status-warning");

      cy.get("dso-shopping-cart-item.hydrated[warning]")
        .first()
        .then(($item) => {
          const warningText = $item.attr("warning");

          cy.wrap($item).shadow().find(".item-name .sr-only").invoke("text").should("equal", warningText);
        });

      cy.get("dso-shopping-cart-item.hydrated:not([warning])")
        .first()
        .shadow()
        .find(".item-name dso-icon")
        .should("not.exist");
    });

    it("does not render a warning icon for an empty warning attribute", () => {
      cy.get("dso-shopping-cart-item.hydrated")
        .first()
        .invoke("attr", "warning", "")
        .shadow()
        .find(".item-name dso-icon")
        .should("not.exist");
    });
  });
});
