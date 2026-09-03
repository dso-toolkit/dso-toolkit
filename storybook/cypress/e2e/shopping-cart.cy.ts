describe("Shopping Cart", () => {
  describe("Side", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-shopping-cart--side");
      cy.get("dso-shopping-cart.hydrated", { timeout: 10000 }).should("exist");
    });

    it("matches image snapshot", () => {
      cy.get("dso-shopping-cart.hydrated").compareSnapshot("shopping-cart-side");
    });

    it("should be accessible", () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-shopping-cart.hydrated");
    });

    it("emits dsoToggle when the user clicks the toggle button", () => {
      cy.get("dso-shopping-cart.hydrated")
        .then(($shoppingCart) => {
          $shoppingCart.on("dsoToggle", cy.stub().as("dsoToggleListener"));
        })
        .shadow()
        .find("dso-icon-button")
        .realClick()
        .get("@dsoToggleListener")
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

    it("renders a nested item as sub item", () => {
      cy.get("dso-shopping-cart-item.hydrated dso-shopping-cart-item.hydrated")
        .first()
        .children("[slot='name']")
        .should("have.css", "font-weight", "400");

      cy.get("dso-shopping-cart-item.hydrated dso-shopping-cart-item.hydrated")
        .first()
        .children("[slot='name']")
        .should("have.css", "-webkit-line-clamp", "2");
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

    it("renders a warning icon only on items with a warning", () => {
      cy.get("dso-shopping-cart-item.hydrated[warning]")
        .first()
        .shadow()
        .find(".item-name dso-icon")
        .invoke("prop", "icon")
        .should("equal", "status-warning");

      cy.get("dso-shopping-cart-item.hydrated:not([warning])")
        .first()
        .shadow()
        .find(".item-name dso-icon")
        .should("not.exist");
    });
  });

  describe("Main", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=core-shopping-cart--main");
      cy.get("dso-shopping-cart.hydrated", { timeout: 10000 }).should("exist");
    });

    it("matches image snapshot", () => {
      cy.get("dso-shopping-cart.hydrated").compareSnapshot("shopping-cart-main");
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

    it("emits dsoToggle when the user clicks the close button", () => {
      cy.get("dso-shopping-cart.hydrated")
        .then(($shoppingCart) => {
          $shoppingCart.on("dsoToggle", cy.stub().as("dsoToggleListener"));
        })
        .shadow()
        .find("button.dso-secondary")
        .realClick()
        .get("@dsoToggleListener")
        .should("be.calledOnce");
    });
  });
});
