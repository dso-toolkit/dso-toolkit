import { waitForComponents } from "../support/wait-for-components";

describe("Grid Column", () => {
  describe("Overlay", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=patronen-shopping-cart--overlay");
      cy.get("dso-grid-column.hydrated", { timeout: 10000 }).should("exist");
    });

    it("matches image snapshot", () => {
      waitForComponents();

      cy.matchImageSnapshot("grid-column-overlay");
    });

    it("should be accessible", () => {
      cy.injectAxe();
      cy.dsoCheckA11y("dso-grid-column.hydrated");
    });

    it("renders the overlay as an open modal dialog", () => {
      cy.get("dso-grid-column.hydrated").shadow().find("dialog").should("have.prop", "open", true);
    });

    it("keeps focus inside the overlay", () => {
      cy.realPress("Tab");

      cy.get("dso-grid-column.hydrated").then(($gridColumn) => {
        cy.document().should((document) => {
          const active = document.activeElement;

          expect($gridColumn[0] === active || $gridColumn[0]!.contains(active)).to.equal(true);
        });
      });
    });

    it("keeps the overlay anchored to the row while scrolling", () => {
      cy.get("dso-grid-column.hydrated")
        .shadow()
        .find("dialog")
        .then(($dialog) => {
          const { top } = $dialog[0]!.getBoundingClientRect();

          cy.scrollTo(0, 200).then(() => {
            expect($dialog[0]!.getBoundingClientRect().top).to.be.closeTo(top - 200, 2);
          });
        });
    });

    it("emits dsoClose when the user clicks the backdrop", () => {
      cy.get("dso-grid-column.hydrated")
        .then(($gridColumn) => {
          $gridColumn.on("dsoClose", cy.stub().as("dsoCloseListener"));
        })
        .shadow()
        .find("dialog")
        .trigger("click", { clientX: 4, clientY: 4, force: true })
        .get("@dsoCloseListener")
        .should("be.calledOnce")
        .invoke("getCalls")
        .invoke("at", -1)
        .its("args.0.detail.originalEvent")
        .should("exist");
    });

    it("emits dsoClose when the user presses Escape", () => {
      cy.get("dso-grid-column.hydrated").then(($gridColumn) => {
        $gridColumn.on("dsoClose", cy.stub().as("dsoCloseListener"));
      });

      cy.realPress("Escape");

      cy.get("@dsoCloseListener")
        .should("be.calledOnce")
        .invoke("getCalls")
        .invoke("at", -1)
        .its("args.0.detail.originalEvent")
        .should("exist");
    });

    it("closes the overlay when the viewport shrinks below the sm breakpoint", () => {
      cy.get("dso-grid-column.hydrated").shadow().find("dialog").should("exist");

      cy.viewport(600, 800);

      cy.get("dso-grid-column.hydrated").shadow().find("dialog").should("not.exist");
      cy.get("dso-grid-column.hydrated").shadow().find("div.grid-column-content").should("exist");
    });
  });

  describe("Overlay below the sm breakpoint", () => {
    beforeEach(() => {
      cy.viewport(600, 800);
      cy.visit("http://localhost:45000/iframe.html?id=patronen-shopping-cart--overlay");
      cy.get("dso-grid-column.hydrated", { timeout: 10000 }).should("exist");
    });

    it("does not render a dialog", () => {
      cy.get("dso-grid-column.hydrated").shadow().find("dialog").should("not.exist");
      cy.get("dso-grid-column.hydrated").shadow().find("div.grid-column-content").should("exist");
    });
  });

  describe("Without overlay", () => {
    beforeEach(() => {
      cy.visit("http://localhost:45000/iframe.html?id=patronen-shopping-cart--overlay&args=mode:side");
      cy.get("dso-grid-column.hydrated", { timeout: 10000 }).should("exist");
    });

    it("does not render a dialog", () => {
      cy.get("dso-grid-column.hydrated").shadow().find("dialog").should("not.exist");
    });

    it("does not emit dsoClose when the user presses Escape", () => {
      cy.get("dso-grid-column.hydrated").then(($gridColumn) => {
        $gridColumn.on("dsoClose", cy.stub().as("dsoCloseListener"));
      });

      cy.realPress("Escape");

      cy.get("@dsoCloseListener").should("not.be.called");
    });
  });
});
