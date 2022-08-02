describe('Alert', () => {
  beforeEach(() => {
    cy.visit('http://localhost:56106/iframe.html?id=pagination--pagination');
  });

  /** Configure the component and set an eventListener as @selectPageListener */
  function prepareComponent(currentPage: number, totalPages: number) {
    cy.get('dso-pagination')
      .invoke('attr', 'current-page', currentPage)
      .invoke('attr', 'total-pages', totalPages)
      .then($pagination => {
        $pagination.on('selectPage', $event => $event.detail.originalEvent.preventDefault());
        $pagination.on('selectPage', cy.stub().as('selectPageListener'));
      });
  }

  it('should show 5 pages and previous/next buttons', () => {
    prepareComponent(3, 5);

    cy
      .get('dso-pagination')
      .shadow()
      .as('dsoPagination')
      .find('.pagination > li')
      .should('have.length', 7)
      .get('@dsoPagination')
      .find('a[aria-label="Vorige"]')
      .should('be.visible')
      .get('@dsoPagination')
      .find('a[aria-label="Volgende"]')
      .should('be.visible');
  });

  it('should emit page on page select', () => {
    prepareComponent(3, 5);

    cy
      .get('dso-pagination')
      .shadow()
      .as('dsoPagination')
      .find('.pagination > li')
      .eq(2)
      .find('a')
      .click()
      .get('@selectPageListener')
      .its('callCount')
      .should('equal', 1)
      .get('@selectPageListener')
      .invoke('getCall', 0)
      .its('args.0.detail.page')
      .should('equal', 2);
  });

  it('should show emit correct page on previous and next page select', () => {
    const currentPage = 3;
    prepareComponent(currentPage, 5);

    cy
      .get('dso-pagination')
      .shadow()
      .as('dsoPagination')
      .find('a[aria-label="Vorige"]')
      .click()
      .get('@selectPageListener')
      .its('callCount')
      .should('equal', 1)
      .get('@selectPageListener')
      .invoke('getCall', 0)
      .its('args.0.detail.page')
      .should('equal', currentPage - 1)
      .get('@dsoPagination')
      .find('a[aria-label="Volgende"]')
      .click()
      .get('@selectPageListener')
      .its('callCount')
      .should('equal', 2)
      .get('@selectPageListener')
      .invoke('getCall', 1)
      .its('args.0.detail.page')
      .should('equal', currentPage + 1);
  });

  it('should not emit event on current page click', () => {
    prepareComponent(3, 5);

    cy
      .get('dso-pagination')
      .shadow()
      .as('dsoPagination')
      .find('.pagination > .active span[aria-current="page"]')
      .click()
      .get('@selectPageListener')
      .should('not.have.been.called');
  });

  it('should emit event with isModifiedEvent true on clicks with modifier keys pressed', () => {
    prepareComponent(3, 5);

    cy
      .get('dso-pagination')
      .shadow()
      .as('dsoPagination')
      .find('a[aria-label="Vorige"]')
      .as('dsoPage')
      .click()
      .get('@selectPageListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail.isModifiedEvent')
      .should('equal', false)
      // Ctrl
      .get('@dsoPage')
      .click({ ctrlKey: true })
      .get('@selectPageListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail.isModifiedEvent')
      .should('equal', true)
      // Shift
      .get('@dsoPage')
      .click({ shiftKey: true })
      .get('@selectPageListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail.isModifiedEvent')
      .should('equal', true)
      // Alt
      .get('@dsoPage')
      .click({ altKey: true })
      .get('@selectPageListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail.isModifiedEvent')
      .should('equal', true)
      // Meta
      .get('@dsoPage')
      .click({ commandKey: true })
      .get('@selectPageListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail.isModifiedEvent')
      .should('equal', true)
      // Right click
      .get('@dsoPage')
      .rightclick()
      .get('@selectPageListener')
      .invoke('getCalls')
      .invoke('at', -1)
      .its('args.0.detail.isModifiedEvent')
      .should('equal', true);
  });
});
