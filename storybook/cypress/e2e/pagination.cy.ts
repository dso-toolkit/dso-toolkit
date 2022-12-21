describe("Pagination", () => {
  beforeEach(() => {
    cy.visit("http://localhost:45000/iframe.html?id=core-pagination--pagination");
  });

  /** Configure the component and set an eventListener as @selectPageListener */
  function prepareComponent(currentPage: number, totalPages: number) {
    cy.get("dso-pagination")
      .invoke("attr", "current-page", currentPage)
      .invoke("attr", "total-pages", totalPages)
      .then(($pagination) => {
        $pagination.on("dsoSelectPage", ($event) => $event.detail.originalEvent.preventDefault());
        $pagination.on("dsoSelectPage", cy.stub().as("selectPageListener"));
      })
      .wait(200);
  }

  it("should show 5 pages and previous/next buttons", () => {
    prepareComponent(3, 5);

    cy.get("dso-pagination")
      .shadow()
      .as("dsoPagination")
      .find(".pagination > li")
      .should("have.length", 7)
      .get("@dsoPagination")
      .find('a[aria-label="Vorige"]')
      .should("be.visible")
      .get("@dsoPagination")
      .find('a[aria-label="Volgende"]')
      .should("be.visible");

    cy.percySnapshot();
  });

  it("should not show ellipsis when page count is in range", () => {
    prepareComponent(4, 8);

    cy.get("dso-pagination")
      .shadow()
      .as("dsoPagination")
      .find(".pagination > li")
      .eq(2)
      .should("not.contain.html", "<span>...</span>")
      .find("a")
      .should("have.text", "2")
      .get("@dsoPagination")
      .find(".pagination > li")
      .eq(7)
      .should("not.contain.html", "<span>...</span>")
      .find("a")
      .should("have.text", "7");

    cy.percySnapshot();
  });

  it("should show ... when first and/or last page are out of range", () => {
    function shouldShowEllipsis(currentPage: number, afterFirst: boolean, beforeLast: boolean) {
      cy.get("dso-pagination")
        .invoke("attr", "current-page", currentPage)
        .shadow()
        .as("dsoPagination")
        .wait(100)
        .then(() => {
          if (afterFirst && beforeLast) {
            cy.get("@dsoPagination")
              .find(".pagination > li")
              .eq(2)
              .should("contain.html", "<span>...</span>")
              .get("@dsoPagination")
              .find(".pagination > li")
              .eq(8)
              .should("contain.html", "<span>...</span>");
          } else if (!afterFirst && beforeLast) {
            cy.get("@dsoPagination")
              .find(".pagination > li")
              .eq(2)
              .should("not.contain.html", "<span>...</span>")
              .get("@dsoPagination")
              .find(".pagination > li")
              .eq(8)
              .should("contain.html", "<span>...</span>");
          } else if (afterFirst && !beforeLast) {
            cy.get("@dsoPagination")
              .find(".pagination > li")
              .eq(2)
              .should("contain.html", "<span>...</span>")
              .get("@dsoPagination")
              .find(".pagination > li")
              .eq(8)
              .should("not.contain.html", "<span>...</span>");
          } else {
            cy.get("@dsoPagination")
              .find(".pagination > li")
              .eq(2)
              .should("not.contain.html", "<span>...</span>")
              .get("@dsoPagination")
              .find(".pagination > li")
              .eq(8)
              .should("not.contain.html", "<span>...</span>");
          }
        });
    }

    prepareComponent(9, 18);

    shouldShowEllipsis(9, true, true);
    shouldShowEllipsis(4, false, true);
    shouldShowEllipsis(14, true, false);
  });

  it("should show different range on different small/medium/large viewport", () => {
    prepareComponent(9, 18);

    cy.get("dso-pagination")
      .shadow()
      .as("dsoPagination")
      .find("dso-responsive-element")
      .as("dsoResponsiveElement")
      .should("have.attr", "large")
      .get("@dsoPagination")
      .find(".pagination > li")
      .should("have.length", 11)
      .get("@dsoResponsiveElement")
      .viewport(600, 660)
      .get("@dsoResponsiveElement")
      .should("have.attr", "medium")
      .get("@dsoPagination")
      .find(".pagination > li")
      .should("have.length", 9)
      .get("@dsoResponsiveElement")
      .viewport(320, 660)
      .get("@dsoResponsiveElement")
      .should("have.attr", "small")
      .get("@dsoPagination")
      .find(".pagination > li")
      .should("have.length", 7);
  });

  it("should not show previous/next buttons when appropriate", () => {
    prepareComponent(1, 5);

    cy.get("dso-pagination")
      .as("dsoPagination")
      .shadow()
      .as("dsoPaginationShadow")
      // currentPage = firstPage
      .find('a[aria-label="Vorige"]')
      .parent()
      .should("not.be.visible")
      .get("@dsoPaginationShadow")
      .find('a[aria-label="Volgende"]')
      .parent()
      .should("be.visible")
      // currentPage = lastPage
      .get("@dsoPagination")
      .invoke("attr", "current-page", 5)
      .get("@dsoPaginationShadow")
      .find('a[aria-label="Vorige"]')
      .parent()
      .should("be.visible")
      .get("@dsoPaginationShadow")
      .find('a[aria-label="Volgende"]')
      .parent()
      .should("not.be.visible")
      // currentPage < firstPage
      .get("@dsoPagination")
      .invoke("attr", "current-page", 0)
      .get("@dsoPaginationShadow")
      .find('a[aria-label="Vorige"]')
      .parent()
      .should("not.be.visible")
      .get("@dsoPaginationShadow")
      .find('a[aria-label="Volgende"]')
      .parent()
      .should("not.be.visible")
      // currentPage > lastPage
      .get("@dsoPagination")
      .invoke("attr", "current-page", 6)
      .get("@dsoPaginationShadow")
      .find('a[aria-label="Vorige"]')
      .parent()
      .should("not.be.visible")
      .get("@dsoPaginationShadow")
      .find('a[aria-label="Volgende"]')
      .parent()
      .should("not.be.visible")
      // currentPage = undefined
      .get("@dsoPagination")
      .invoke("removeAttr", "current-page")
      .get("@dsoPaginationShadow")
      .find('a[aria-label="Vorige"]')
      .parent()
      .should("not.be.visible")
      .get("@dsoPaginationShadow")
      .find('a[aria-label="Volgende"]')
      .parent()
      .should("not.be.visible");
  });

  it("should emit page on page select", () => {
    prepareComponent(3, 5);

    cy.get("dso-pagination")
      .shadow()
      .as("dsoPagination")
      .find(".pagination > li")
      .eq(2)
      .find("a")
      .click()
      .get("@selectPageListener")
      .its("callCount")
      .should("equal", 1)
      .get("@selectPageListener")
      .invoke("getCall", 0)
      .its("args.0.detail.page")
      .should("equal", 2);
  });

  it("should show emit correct page on previous and next page select", () => {
    const currentPage = 6;
    prepareComponent(currentPage, 28);

    cy.get("dso-pagination")
      .shadow()
      .as("dsoPagination")
      .find('a[aria-label="Vorige"]')
      .should("have.attr", "href", "#5")
      .click()
      .get("@selectPageListener")
      .its("callCount")
      .should("equal", 1)
      .get("@selectPageListener")
      .invoke("getCall", 0)
      .its("args.0.detail.page")
      .should("equal", currentPage - 1)
      .get("@dsoPagination")
      .find('a[aria-label="Volgende"]')
      .should("have.attr", "href", "#7")
      .click()
      .get("@selectPageListener")
      .its("callCount")
      .should("equal", 2)
      .get("@selectPageListener")
      .invoke("getCall", 1)
      .its("args.0.detail.page")
      .should("equal", currentPage + 1);
  });

  it("should not emit event on current page click", () => {
    prepareComponent(3, 5);

    cy.get("dso-pagination")
      .shadow()
      .as("dsoPagination")
      .find('.pagination > .active span[aria-current="page"]')
      .click()
      .get("@selectPageListener")
      .should("not.have.been.called");
  });

  it("should emit event with isModifiedEvent true on clicks with modifier keys pressed", () => {
    prepareComponent(3, 5);

    cy.get("dso-pagination")
      .shadow()
      .as("dsoPagination")
      .find('a[aria-label="Vorige"]')
      .as("dsoPage")
      .click()
      .get("@selectPageListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", false)
      // Ctrl
      .get("@dsoPage")
      .click({ ctrlKey: true })
      .get("@selectPageListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Shift
      .get("@dsoPage")
      .click({ shiftKey: true })
      .get("@selectPageListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Alt
      .get("@dsoPage")
      .click({ altKey: true })
      .get("@selectPageListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Meta
      .get("@dsoPage")
      .click({ commandKey: true })
      .get("@selectPageListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true)
      // Right click
      .get("@dsoPage")
      .rightclick()
      .get("@selectPageListener")
      .invoke("getCalls")
      .invoke("at", -1)
      .its("args.0.detail.isModifiedEvent")
      .should("equal", true);
  });
});
