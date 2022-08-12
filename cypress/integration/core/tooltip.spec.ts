describe('Tooltip', () => {
  beforeEach(() => {
    cy.visit('http://localhost:56106/iframe.html?id=tooltip--as-child');
  });

  it('should show tooltip on hover on button and hide on escape key', () => {
    cy
      .get('dso-tooltip').should('not.be.visible')
      .closest('button')
      .realHover();
    cy.get('dso-tooltip').should('not.have.class', 'hidden');
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get('dso-tooltip').should('have.class', 'hidden');
  });

  it('should show tooltip on focus on button and hide on escape key', () => {
    cy
      .get('dso-tooltip')
      .should('not.be.visible')
      .closest('button')
      .focus();
    cy.get('dso-tooltip').should('not.have.class', 'hidden');
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get('dso-tooltip').should('have.class', 'hidden');
  });
});
