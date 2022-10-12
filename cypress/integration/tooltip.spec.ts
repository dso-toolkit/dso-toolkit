describe('Tooltip', () => {
  beforeEach(() => {
    cy.visit('http://localhost:45000/iframe.html?id=core-tooltip--as-child');

    cy.get('#root')
      .invoke('attr', 'style', 'min-height: 360px;');

    cy.get('dso-tooltip')
      .closest('button')
      .as('dsoButton');
  });

  // https://github.com/dmtrKovalenko/cypress-real-events/issues/247
  // realHover has issues since chrome 100.

  // it('should show tooltip on hover on button and hide on escape key', () => {
  //   prepareComponent();

  //   cy
  //     .get('@dsoButton')
  //     .realHover();
  // });

  it.skip('should show tooltip on focus on button and hide on escape key', () => {
    cy
      .get('@dsoButton')
      .wait(100)
      .focus()
      .wait(100)
      .find('dso-tooltip')
      .should('not.have.class', 'hidden')
      .wait(250)
      .realPress('Escape')
      .wait(100)
      .get('@dsoButton')
      .find('dso-tooltip')
      .should('have.class', 'hidden');
  });

  it('should be accessible', () => {
    // as child
    cy.get('dso-tooltip')
      .then(($tooltip) => {
        const id = $tooltip.attr('for');

        cy.get('dso-tooltip')
          .should('have.attr', 'for', id)
          .shadow()
          .find('.tooltip')
          .should('have.id', id)
          .and('have.attr', 'role', 'tooltip')
          .get('@dsoButton')
          .should('have.attr', 'aria-describedby', id);
      });

    cy.visit('http://localhost:45000/iframe.html?id=core-tooltip--as-sibling');

    // as sibling
    cy.get('dso-tooltip')
      .then(($tooltip) => {
        const id = $tooltip.attr('for');

        cy.get('dso-tooltip')
          .should('have.attr', 'for', id)
          .shadow()
          .find('.tooltip')
          .should('have.id', id)
          .and('have.attr', 'role', 'tooltip')
          .get('dso-tooltip')
          .prev()
          .should('have.attr', 'aria-describedby', id);
      });
  });
});
